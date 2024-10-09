import { createSdk } from '../utils/sdk'
import { optimismSepoliaConfig } from '../../src/network-config'
import { Wallet } from 'ethers'

describe('Optimism Sepolia Verification', () => {
  // the contract deployed on optimism sepolia: https://github.com/DappyKit/contracts
  const verificationContractAddress = '0x721462E34DCC00F8Bd0f0cD07762cfd482a0Fcb4'
  // although the address is verified on the time of writing this test it will be expired after <6 months
  // it can cause the test to fail, so it should be updated
  const verifiedAddress = '0x293AC5D2C7df3e9742d8e562d7cEE8Ba6ce43D81'
  const notVerifiedAddress = '0x3a6019cc36FB715Bd7aE6f83BEA98Bbe77E06f50'
  const managerAddress = '0xae70aeb668d3f6de045765657999957388cdf025'

  it(`should get info about user's verification`, async () => {
    const sdk = await createSdk(optimismSepoliaConfig, Wallet.createRandom())
    expect(await sdk.verification.getIsVerified(verifiedAddress, verificationContractAddress)).toEqual(true)
    expect(await sdk.verification.getIsVerified(notVerifiedAddress, verificationContractAddress)).toEqual(false)
  })

  it(`should get token id of the user`, async () => {
    const sdk = await createSdk(optimismSepoliaConfig, Wallet.createRandom())
    const tokenId = await sdk.verification.getTokenId(verifiedAddress, verificationContractAddress)
    expect(tokenId).toEqual('68579410290623560541334757137125908201458771167157024679308233665838308954395')
    await expect(sdk.verification.getTokenId(notVerifiedAddress, verificationContractAddress)).rejects.toThrow(
      /User does not have a token/,
    )
  })

  it(`should check if the token is expired`, async () => {
    // to prolong the token, go to https://sepolia-optimism.etherscan.io/address/0x721462E34DCC00F8Bd0f0cD07762cfd482a0Fcb4#writeContract
    // with 0xaE70aEb668D3f6De045765657999957388CDF025, call "extendTokenExpiry" with the tokenId received using "getTokenId"
    const sdk = await createSdk(optimismSepoliaConfig, Wallet.createRandom())
    const tokenId = await sdk.verification.getTokenId(verifiedAddress, verificationContractAddress)
    expect(await sdk.verification.isTokenExpired(tokenId, verificationContractAddress)).toEqual(false)
    await expect(sdk.verification.isTokenExpired('123', verificationContractAddress)).rejects.toThrow(
      /Token does not exist/,
    )
  })

  it(`should get the time before the token expires in seconds`, async () => {
    const sdk = await createSdk(optimismSepoliaConfig, Wallet.createRandom())
    const tokenId = await sdk.verification.getTokenId(verifiedAddress, verificationContractAddress)
    expect(await sdk.verification.timeBeforeExpiration(tokenId, verificationContractAddress)).toBeGreaterThan(0)
    await expect(sdk.verification.timeBeforeExpiration('123', verificationContractAddress)).rejects.toThrow(
      /Token does not exist/,
    )
  })

  it(`should check if the token exists`, async () => {
    const sdk = await createSdk(optimismSepoliaConfig, Wallet.createRandom())
    const tokenId = await sdk.verification.getTokenId(verifiedAddress, verificationContractAddress)
    expect(await sdk.verification.tokenExists(tokenId, verificationContractAddress)).toEqual(true)
    expect(await sdk.verification.tokenExists('123', verificationContractAddress)).toEqual(false)
  })

  it(`should check if the user is a manager`, async () => {
    const sdk = await createSdk(optimismSepoliaConfig, Wallet.createRandom())
    expect(await sdk.verification.isManager(verifiedAddress, verificationContractAddress)).toEqual(false)
    expect(await sdk.verification.isManager(notVerifiedAddress, verificationContractAddress)).toEqual(false)
    expect(await sdk.verification.isManager(managerAddress, verificationContractAddress)).toEqual(true)
  })

  it(`should get the default expiry duration`, async () => {
    const sdk = await createSdk(optimismSepoliaConfig, Wallet.createRandom())
    expect(await sdk.verification.getDefaultExpiryDuration(verificationContractAddress)).toEqual(15780096)
  })
})
