import { createSdk, OP_SEPOLIA_MNEMONIC, WAIT_CONFIRMATIONS } from '../utils/sdk'
import { optimismSepoliaConfig } from '../../src/network-config'
import { ethers, Wallet } from 'ethers'
import { getMultihash } from '../../src/utils/multihash'
import { generateRandomString } from '../utils/string'

describe('Optimism Sepolia Filesystem Changes', () => {
  it('should set and get correct multihash value to fs for a service', async () => {
    const owner = Wallet.fromPhrase(OP_SEPOLIA_MNEMONIC)
    const sdk = await createSdk(optimismSepoliaConfig, owner)
    const connectionsOwner = await sdk.account.getAddress()
    const multihash1 = getMultihash(ethers.keccak256(ethers.toUtf8Bytes(generateRandomString())))
    await (await sdk.filesystemChanges.setServiceChange(multihash1)).wait(WAIT_CONFIRMATIONS)
    expect((await sdk.filesystemChanges.getServiceChangeMultihash(connectionsOwner)).hash).toEqual(multihash1.hash)
  })

  it('should set and get correct multihash value to fs for a user', async () => {
    const owner = Wallet.fromPhrase(OP_SEPOLIA_MNEMONIC)
    const sdk = await createSdk(optimismSepoliaConfig, owner)
    const connectionsOwner = await sdk.account.getAddress()
    const multihash1 = getMultihash(ethers.keccak256(ethers.toUtf8Bytes(generateRandomString())))
    await (await sdk.filesystemChanges.setUserChange(multihash1)).wait(WAIT_CONFIRMATIONS)
    expect((await sdk.filesystemChanges.getUserChangeMultihash(connectionsOwner)).hash).toEqual(multihash1.hash)
  })
})
