import { SmartAccountSigner } from '@alchemy/aa-core'
import { RpcHelper } from '../rpc-helper'
import { IConfig } from '../config'

/**
 * Account abstraction
 */
export class AccountAbstraction {
  public readonly rpcHelper: RpcHelper
  constructor(
    public readonly config: IConfig,
    public readonly signer: SmartAccountSigner,
  ) {
    this.rpcHelper = new RpcHelper(config, signer)
  }

  /**
   * Gets Smart Account address
   */
  async getAccountAddress(): Promise<string> {
    return this.rpcHelper.smartAccountSigner.getAddress()
  }
}
