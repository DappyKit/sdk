import { createSdk } from '../utils/sdk'
import { optimismMainnetConfig } from '../../src/network-config'
import { Wallet } from 'ethers'

describe('Optimism Mainnet Verification Gateway', () => {
  it('should get info about address', async () => {
    const address = '0xDb0c6C27C2C1ea4193d808bAB25be0Fc27fa4867'
    const owner = Wallet.createRandom()
    const sdk = await createSdk(optimismMainnetConfig, owner)

    expect(await sdk.gateway.verification.getSmartAccountInfo(address)).toEqual({
      smartAccountAddress: '0x4FFC738603dDAa0E1CeDe748166E5f7b73DDa7Dc',
      optimismMainnet: { isDeployed: true, verifiedBy: ['farcaster'] },
    })
  })

  it('should respond with error during Farcaster verification', async () => {
    const clickData =
      '0a62080d10edd2151880d2e13020018201520a3268747470733a2f2f776172702e64617070796b69742e6f72672f76312f6170702f667269656e64733f69643d33353436363910011a1a08edd215121407895dc3b4a4ba0cf9d895255801a3941b126d521214d488a7676f7c37381154a36e25653a293c84b51b18012240dc0aced6c7f1ab9df17e6607e0256543a08ba2ed462d862b15bfcba07c94e450b86c61b0f3ded9411aa822de9ca9b1bb92dd6400130844f8fdc18c3dff2e840b28013220cd7187a37ac577dd0884b3fe7e443bc36cca4753f502339be8ad3c0d387a82ec'
    const owner = Wallet.createRandom()
    const sdk = await createSdk(optimismMainnetConfig, owner)

    expect(await sdk.gateway.verification.verifyFarcaster(clickData)).toEqual({
      status: 'error',
      message: 'Frame URL is not allowed',
    })
  })

  it('should respond with error during Google verification', async () => {
    const owner = Wallet.createRandom()
    const sdk = await createSdk(optimismMainnetConfig, owner)

    expect(await sdk.gateway.verification.verifyGoogle('one', await owner.signMessage('two'))).toEqual({
      status: 'error',
      message: 'Wrong number of segments in token: one',
    })
  })
})
