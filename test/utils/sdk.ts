import { SDK } from '../../src'
import { IConfig } from '../../src/config'
import { HDNodeWallet } from 'ethers'
import { convertHDNodeWalletToAccountSigner } from '../../src/rpc-helper/utils'

/**
 * Create SDK instance
 */
export function createSdk(config: IConfig, wallet: HDNodeWallet): SDK {
  return new SDK(config, convertHDNodeWalletToAccountSigner(wallet))
}
