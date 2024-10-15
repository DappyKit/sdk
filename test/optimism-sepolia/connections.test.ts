import { createSdk, OP_SEPOLIA_MNEMONIC, WAIT_TX_MS } from '../utils/sdk'
import { optimismSepoliaConfig } from '../../src/network-config'
import { getMultihash } from '../../src/utils/multihash'
import { generateRandomString } from '../utils/string'
import { sleep } from '../utils/time'
import { keccak256, toBytes } from 'viem'

describe('Optimism Sepolia Connections', () => {
  it('should set and get correct multihash value to connections for a user', async () => {
    const sdk = await createSdk(optimismSepoliaConfig, OP_SEPOLIA_MNEMONIC)
    const connectionsOwner = await sdk.account.getAddress()
    const multihash1 = getMultihash(keccak256(toBytes(generateRandomString())))
    await sdk.connections.setUserConnection(multihash1)
    await sleep(WAIT_TX_MS)
    expect((await sdk.connections.getUserConnectionMultihash(connectionsOwner)).hash).toEqual(multihash1.hash)
  })

  it('should set and get correct multihash value to connections for a service', async () => {
    const sdk = await createSdk(optimismSepoliaConfig, OP_SEPOLIA_MNEMONIC)
    const connectionsOwner = await sdk.account.getAddress()
    const multihash1 = getMultihash(keccak256(toBytes(generateRandomString())))
    await sdk.connections.setServiceConnection(multihash1)
    await sleep(WAIT_TX_MS)
    expect((await sdk.connections.getServiceConnectionMultihash(connectionsOwner)).hash).toEqual(multihash1.hash)
  })
})
