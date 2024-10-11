import { RpcHelper } from '../rpc-helper'
import { INetworkConfig } from '../network-config'
import { HDAccount } from 'viem/accounts'

/**
 * Account abstraction
 */
export class Account {
  public readonly rpcHelper: RpcHelper
  constructor(
    public readonly config: INetworkConfig,
    public readonly signer?: HDAccount,
  ) {
    this.rpcHelper = new RpcHelper(config, signer)
  }

  /**
   * Gets Smart Account address
   */
  async getAddress(): Promise<string> {
    return (await this.rpcHelper.getAccount()).address
  }
}
