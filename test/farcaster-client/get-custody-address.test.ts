import { createSdk } from '../utils/sdk'
import { optimismMainnetConfig } from '../../src/network-config'
import { createRandomMnemonic } from '../utils/wallet'

describe('Farcaster Client', () => {
  it('should get custody address', async () => {
    const sdk = await createSdk(optimismMainnetConfig, createRandomMnemonic())
    expect(await sdk.farcasterClient.getCustodyAddress(354669)).toEqual('0xDb0c6C27C2C1ea4193d808bAB25be0Fc27fa4867')
  })
})
