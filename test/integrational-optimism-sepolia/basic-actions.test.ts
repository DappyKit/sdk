import { createSdk } from '../utils/sdk'
import { optimismSepoliaConfig } from '../../src/config'
import { ethers, Wallet } from 'ethers'
import { getMultihash } from '../../src/utils/multihash'
import { generateRandomString } from '../utils/string'

const MNEMONIC = process.env.OP_SEPOLIA_MNEMONIC!
const EXPECTED_OWNER_ADDRESS = process.env.OP_SEPOLIAD_EXPECTED_OWNER_ADDRESS
const EXPECTED_SMART_ACCOUNT_ADDRESS = process.env.OP_SEPOLIAD_EXPECTED_SMART_ACCOUNT_ADDRESS

function isNoData() {
  return !MNEMONIC || !EXPECTED_OWNER_ADDRESS || !EXPECTED_SMART_ACCOUNT_ADDRESS
}
describe('Optimism Sepolia Integrational Tests', () => {
  it('should calculate correct smart account address', async () => {
    if (isNoData()) {
      return
    }

    const owner = Wallet.fromPhrase('soda rate praise license sauce frown exhaust topple fog voice neck roast')
    const sdk = createSdk(optimismSepoliaConfig, owner)
    const connectionsOwner = await sdk.accountAbstraction.getAccountAddress()
    expect(owner.address).toEqual('0xa1D2fC95b8D84b73a7A42cBe60d78213776B4Cb4')
    expect(connectionsOwner).toEqual('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b')
  })

  it('should set and get correct multihash value', async () => {
    if (isNoData()) {
      return
    }

    const owner = Wallet.fromPhrase(MNEMONIC)
    const sdk = createSdk(optimismSepoliaConfig, owner)
    const connectionsOwner = await sdk.accountAbstraction.getAccountAddress()
    const multihash1 = getMultihash(ethers.keccak256(ethers.toUtf8Bytes(generateRandomString())))
    await sdk.connections.setUserConnection(multihash1)
    expect((await sdk.connections.getUserConnectionMultihash(connectionsOwner)).hash).toEqual(multihash1.hash)
  })
})
