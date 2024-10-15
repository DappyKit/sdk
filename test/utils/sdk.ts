import { SDK } from '../../src'
import { INetworkConfig } from '../../src/network-config'
import 'dotenv/config'

/**
 * Wait time for transaction to be mined in milliseconds
 */
export const WAIT_TX_MS = 20000

export const OP_SEPOLIA_MNEMONIC = process.env.OP_SEPOLIA_MNEMONIC!
const EXPECTED_OWNER_ADDRESS = process.env.OP_SEPOLIAD_EXPECTED_OWNER_ADDRESS
const EXPECTED_SMART_ACCOUNT_ADDRESS = process.env.OP_SEPOLIAD_EXPECTED_SMART_ACCOUNT_ADDRESS

export function isNoData() {
  return !OP_SEPOLIA_MNEMONIC || !EXPECTED_OWNER_ADDRESS || !EXPECTED_SMART_ACCOUNT_ADDRESS
}

export function isNoMnemonic() {
  return !OP_SEPOLIA_MNEMONIC
}

export const EMPTY_MULTIHASH = {
  hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  hashFunction: 0,
  size: 0,
}

/**
 * Create SDK instance
 */
export async function createSdk(config: INetworkConfig, mnemonic: string): Promise<SDK> {
  if (!mnemonic) {
    throw new Error('Mnemonic is required')
  }

  return new SDK(config, mnemonic)
}
