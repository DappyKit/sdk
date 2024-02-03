import { createDappyAuthMock } from '../utils/dappy-auth-mock'
import { createSdk } from '../utils/sdk'
import { AppParamsResult, AuthStrategy } from '../../src/gateway/interface'
import { ethers } from 'ethers'
import { UserInfo, UserVerificationStatus } from '../../src/gateway/user/interface'
import { GatewayUser } from '../../src/gateway'
import { optimismSepoliaConfig } from '../../src/network-config'

describe("Verify User's external account and deploy Smart Account", () => {
  let getUserInfoMock: jest.SpyInstance

  const mockGetUserInfo = (user: GatewayUser, status: UserVerificationStatus, onChainVerified: boolean) => {
    if (getUserInfoMock) {
      getUserInfoMock.mockRestore()
    }

    getUserInfoMock = jest.spyOn(user, 'getInfo').mockImplementation(async (address: string): Promise<UserInfo> => {
      return Promise.resolve({
        address,
        version: '1',
        verification: {
          onChainVerified,
          status,
        },
      })
    })
  }

  it('should create an account via the gateway', async () => {
    const sdk = createSdk(optimismSepoliaConfig, ethers.Wallet.createRandom())
    // todo timeout because of RpcHelper initialization and error "ReferenceError: You are trying to `import` a file after the Jest environment has been torn down."
    await new Promise(resolve => setTimeout(resolve, 1000))

    const appId = 1
    const appSigner = ethers.Wallet.createRandom()
    // mock of Dappy Auth is like a browser on a device
    const dappyAuthMock = createDappyAuthMock()
    const saAddress = '0x4597b6281dDa29CA5a750CAe29Be3fd19c31727c'

    // create Smart Account + Verify with default service + Allow app signer
    const authUrl = sdk.gateway.getAuthUrl(appId, {
      authStrategy: AuthStrategy.VERIFY_ACCOUNT,
      appSignerAddress: appSigner.address,
    })
    // open auth url in the browser (not WebView). After actions performed in the browser, the browser should open the app
    await dappyAuthMock.open(authUrl)

    // after the app is opened again from the Auth site, the app should receive data from the browser
    const appOpened = async (data: string) => {
      const appParams = sdk.gateway.parseAppParams(data)
      expect(appParams.result).toEqual(AppParamsResult.OK)
      expect(appParams.smartAccountAddress).toEqual(saAddress)
      expect(appParams.version).toEqual('1')
      expect(appParams.signature).toBeDefined()
      expect(appParams.dateUntil).toBeDefined()
      mockGetUserInfo(sdk.gateway.user, UserVerificationStatus.PENDING, false)
      const userInfo1 = await sdk.gateway.user.getInfo(appParams.smartAccountAddress!)
      expect(userInfo1.verification.status).toEqual(UserVerificationStatus.PENDING)
      expect(userInfo1.verification.onChainVerified).toEqual(false)

      mockGetUserInfo(sdk.gateway.user, UserVerificationStatus.DONE, true)
      const userInfo2 = await sdk.gateway.user.getInfo(appParams.smartAccountAddress!)
      expect(userInfo2.verification.status).toEqual(UserVerificationStatus.DONE)
      expect(userInfo2.verification.onChainVerified).toEqual(true)
    }

    // the call from the Auth site in the browser to the app
    await appOpened(`v=1&result=ok&sad=${saAddress}&signature=0x1234567890&dateUntil=1234567890`)
  })
})
