import { createSdk } from '../utils/sdk'
import { optimismMainnetConfig } from '../../src/network-config'
import { ICallbackDataCheck } from '../../src/farcaster-client'
import { DelegatedFs } from '../../src/service/delegated-fs/delegated-fs'
import { createISignerWallet, createRandomMnemonic, createRandomWallet } from '../utils/wallet'

describe('Farcaster Client', () => {
  it('should check correct callback data', async () => {
    const sdk = await createSdk(optimismMainnetConfig, createRandomMnemonic())

    const userMainWallet = createRandomWallet()
    const userDelegatedWallet = createRandomWallet()
    const applicationWallet = createRandomWallet()
    const authServiceWallet = createISignerWallet()

    const proof = await DelegatedFs.createDelegateSignature(
      userMainWallet.address,
      userDelegatedWallet.address,
      applicationWallet.address,
      authServiceWallet,
    )

    const dataToCheck: ICallbackDataCheck = {
      userMainAddress: userMainWallet.address,
      userDelegatedAddress: userDelegatedWallet.address,
      applicationAddress: applicationWallet.address,
      proof,
    }

    await expect(
      sdk.farcasterClient.checkCallbackData(dataToCheck, applicationWallet.address, authServiceWallet.address),
    ).resolves.toBeUndefined()
  })

  it('should throw on incorrect callback data', async () => {
    const sdk = await createSdk(optimismMainnetConfig, createRandomMnemonic())

    const userMainWallet = createRandomWallet()
    const userDelegatedWallet = createRandomWallet()
    const applicationWallet = createISignerWallet()
    const authServiceWallet = createRandomWallet()

    const proof = await DelegatedFs.createDelegateSignature(
      userMainWallet.address,
      userDelegatedWallet.address,
      applicationWallet.address,
      // incorrect signer
      applicationWallet,
    )

    const dataToCheck: ICallbackDataCheck = {
      userMainAddress: userMainWallet.address,
      userDelegatedAddress: userDelegatedWallet.address,
      applicationAddress: applicationWallet.address,
      proof,
    }

    await expect(
      sdk.farcasterClient.checkCallbackData(dataToCheck, applicationWallet.address, authServiceWallet.address),
    ).rejects.toThrow('Invalid proof')
  })

  it('should check correct callback data with error', async () => {
    const sdk = await createSdk(optimismMainnetConfig, createRandomMnemonic())

    const userMainWallet = createRandomWallet()
    const userDelegatedWallet = createRandomWallet()
    const applicationWallet = createRandomWallet()
    const authServiceWallet = createISignerWallet()

    const errorMessage = 'My Custom Error'

    const proofError = await DelegatedFs.createDelegateSignature(
      userMainWallet.address,
      userDelegatedWallet.address,
      applicationWallet.address,
      authServiceWallet,
      errorMessage,
    )

    const dataToCheckError: ICallbackDataCheck = {
      userMainAddress: userMainWallet.address,
      userDelegatedAddress: userDelegatedWallet.address,
      applicationAddress: applicationWallet.address,
      proof: proofError,
      errorMessage,
    }

    await expect(
      sdk.farcasterClient.checkCallbackData(dataToCheckError, applicationWallet.address, authServiceWallet.address),
    ).resolves.toBeUndefined()
  })

  it('should throw with incorrect error', async () => {
    const sdk = await createSdk(optimismMainnetConfig, createRandomMnemonic())

    const userMainWallet = createRandomWallet()
    const userDelegatedWallet = createRandomWallet()
    const applicationWallet = createRandomWallet()
    const authServiceWallet = createISignerWallet()

    const errorMessage = 'My Custom Error'
    const proofError = await DelegatedFs.createDelegateSignature(
      userMainWallet.address,
      userDelegatedWallet.address,
      applicationWallet.address,
      authServiceWallet,
      errorMessage,
    )

    const dataToCheckError: ICallbackDataCheck = {
      userMainAddress: userMainWallet.address,
      userDelegatedAddress: userDelegatedWallet.address,
      applicationAddress: applicationWallet.address,
      proof: proofError,
      errorMessage,
    }

    await expect(
      sdk.farcasterClient.checkCallbackData(dataToCheckError, applicationWallet.address, authServiceWallet.address),
    ).resolves.toBeUndefined()
  })
})
