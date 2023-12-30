import { AccountAbstraction } from './account-abstraction'
import { Gateway } from './gateway'
import { Connections } from './connections'
import * as Config from './config'
import * as Utils from './utils'
import { IConfig } from './config'
import { SmartAccountSigner } from '@alchemy/aa-core'
import * as RpcHelperUtils from './rpc-helper/utils'
import { Wallet } from 'ethers'

/**
 * Export all things that should be available for the user of the library
 */
export { AccountAbstraction, Config, Gateway, Connections, Utils, SmartAccountSigner, RpcHelperUtils, Wallet }

export class SDK {
  public readonly accountAbstraction: AccountAbstraction
  public readonly gateway: Gateway
  public readonly connections: Connections

  constructor(
    public readonly config: IConfig,
    public readonly signer: SmartAccountSigner,
  ) {
    this.accountAbstraction = new AccountAbstraction(config, signer)
    this.gateway = new Gateway(config.appAuthUrl)
    this.connections = new Connections(config, this.accountAbstraction.rpcHelper, signer)
  }
}

declare global {
  interface Window {
    DappyKit: {
      SDK: typeof SDK
      AccountAbstraction: typeof import('./account-abstraction').AccountAbstraction
      Gateway: typeof import('./gateway').Gateway
      GatewayUser: typeof import('./gateway/gateway-user').GatewayUser
      Connections: typeof import('./connections').Connections
      Config: typeof import('./config')
      Utils: typeof import('./utils')
      RpcHelperUtils: typeof RpcHelperUtils
      Wallet: typeof Wallet
    }
  }
}
