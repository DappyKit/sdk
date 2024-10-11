import { Account } from './account'
import { Gateway } from './gateway'
import { Connections } from './connections'
import * as Config from './network-config'
import * as Utils from './utils'
import { INetworkConfig } from './network-config'
import { FilesystemChanges } from './filesystem-changes'
import { Verification } from './verification'
import { FarcasterClient } from './farcaster-client'
import { HDAccount, mnemonicToAccount, privateKeyToAccount, generateMnemonic, english } from 'viem/accounts'
import { HttpClient } from './http-client/http-client'

const ViemUtils = { mnemonicToAccount, generateMnemonic, privateKeyToAccount, english }

/**
 * Export all things that should be available for the user of the library
 */
export { Account, Config, Connections, FilesystemChanges, Gateway, Utils, Verification, FarcasterClient, ViemUtils }

export class SDK {
  public readonly eoaSigner?: HDAccount
  public readonly account: Account
  public readonly gateway: Gateway
  public readonly connections: Connections
  public readonly filesystemChanges: FilesystemChanges
  public readonly verification: Verification
  public readonly farcasterClient: FarcasterClient

  constructor(
    public readonly networkConfig: INetworkConfig,
    mnemonic?: string,
  ) {
    if (mnemonic) {
      this.eoaSigner = mnemonicToAccount(mnemonic)
    }

    this.account = new Account(networkConfig, this.eoaSigner)
    this.gateway = new Gateway(networkConfig.appAuthUrl, networkConfig.verificationRpcUrl)
    this.connections = new Connections(networkConfig, this.account.rpcHelper, this.eoaSigner)
    this.filesystemChanges = new FilesystemChanges(networkConfig, this.account.rpcHelper, this.eoaSigner)
    this.verification = new Verification(networkConfig, this.account.rpcHelper)
    this.farcasterClient = new FarcasterClient(networkConfig, new HttpClient(networkConfig.farcasterAuthApiUrl))
  }
}

declare global {
  interface Window {
    DappyKit: {
      SDK: typeof SDK
      Account: typeof Account
      Gateway: typeof Gateway
      GatewayUser: typeof import('./gateway/gateway-user').GatewayUser
      Connections: typeof Connections
      FilesystemChanges: typeof FilesystemChanges
      Config: typeof Config
      Utils: typeof Utils
      Verification: typeof Verification
      FarcasterClient: typeof FarcasterClient
      ViemUtils: typeof ViemUtils
    }
  }
}
