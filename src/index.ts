import { Account } from './account'
import { Gateway } from './gateway'
import { Connections } from './connections'
import * as Config from './config'
import * as Utils from './utils'
import { IConfig } from './config'
import { SmartAccountSigner } from '@alchemy/aa-core'
import * as RpcHelperUtils from './rpc-helper/utils'
import { Wallet, HDNodeWallet } from 'ethers'
import { FilesystemChanges } from './filesystem-changes'

/**
 * Export all things that should be available for the user of the library
 */
export { Account, Config, Gateway, Connections, Utils, SmartAccountSigner, RpcHelperUtils, Wallet }

export class SDK {
  public readonly account: Account
  public readonly gateway: Gateway
  public readonly connections: Connections
  public readonly filesystemChanges: FilesystemChanges

  constructor(
    public readonly config: IConfig,
    public readonly signer: SmartAccountSigner,
  ) {
    this.account = new Account(config, signer)
    this.gateway = new Gateway(config.appAuthUrl)
    this.connections = new Connections(config, this.account.rpcHelper, signer)
    this.filesystemChanges = new FilesystemChanges(config, this.account.rpcHelper, signer)
  }
}

declare global {
  interface Window {
    DappyKit: {
      SDK: typeof SDK
      Account: typeof import('./account').Account
      Gateway: typeof import('./gateway').Gateway
      GatewayUser: typeof import('./gateway/gateway-user').GatewayUser
      Connections: typeof import('./connections').Connections
      Config: typeof import('./config')
      Utils: typeof import('./utils')
      RpcHelperUtils: typeof RpcHelperUtils
      Wallet: typeof Wallet
      HDNodeWallet: typeof HDNodeWallet
    }
  }
}
