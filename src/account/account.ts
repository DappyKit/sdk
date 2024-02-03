import { SmartAccountSigner } from '@alchemy/aa-core'
import { RpcHelper } from '../rpc-helper'
import { INetworkConfig } from '../network-config'

/**
 * Account abstraction
 */
export class Account {
  public readonly rpcHelper: RpcHelper
  constructor(
    public readonly config: INetworkConfig,
    public readonly signer: SmartAccountSigner,
  ) {
    this.rpcHelper = new RpcHelper(config, signer)
  }

  /**
   * Gets Smart Account address
   */
  async getAddress(): Promise<string> {
    return this.rpcHelper.aaSigner.getAddress()
  }
}
