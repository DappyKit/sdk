import { SDK } from '../../src'
import { INetworkConfig } from '../../src/network-config'
import { HDNodeWallet } from 'ethers'
import { convertHDNodeWalletToAccountSigner } from '../../src/rpc-helper/utils'
import 'dotenv/config'

export const WAIT_CONFIRMATIONS = 5

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
export async function createSdk(config: INetworkConfig, wallet: HDNodeWallet): Promise<SDK> {
  const sdk = new SDK(config, convertHDNodeWalletToAccountSigner(wallet))
  // todo timeout because of RpcHelper initialization and error "ReferenceError: You are trying to `import` a file after the Jest environment has been torn down."
  await new Promise(resolve => setTimeout(resolve, 1000))

  return sdk
}
