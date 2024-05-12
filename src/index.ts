import { Account } from './account'
import { Gateway } from './gateway'
import { Connections } from './connections'
import * as Config from './network-config'
import * as Utils from './utils'
import { INetworkConfig } from './network-config'
import { SmartAccountSigner } from '@alchemy/aa-core'
import * as RpcHelperUtils from './rpc-helper/utils'
import { ethers } from 'ethers'
import { FilesystemChanges } from './filesystem-changes'
import { Verification } from './verification'
import { FarcasterClient } from './farcaster-client'
import { HttpClient } from './http-client/http-client'
import { convertHDNodeWalletToAccountSigner } from './rpc-helper/utils'

const { Wallet, HDNodeWallet } = ethers

/**
 * Export all things that should be available for the user of the library
 */
export {
  Account,
  Config,
  Gateway,
  Connections,
  Utils,
  SmartAccountSigner,
  RpcHelperUtils,
  Wallet,
  Verification,
  FarcasterClient,
  ethers,
}

export class SDK {
  public readonly signer: SmartAccountSigner

  public readonly account: Account
  public readonly gateway: Gateway
  public readonly connections: Connections
  public readonly filesystemChanges: FilesystemChanges
  public readonly verification: Verification
  public readonly farcasterClient: FarcasterClient

  constructor(
    public readonly networkConfig: INetworkConfig,
    signerOrMnemonic: SmartAccountSigner | string,
  ) {
    if (typeof signerOrMnemonic === 'string') {
      this.signer = convertHDNodeWalletToAccountSigner(HDNodeWallet.fromPhrase(signerOrMnemonic))
    } else {
      this.signer = signerOrMnemonic
    }

    this.account = new Account(networkConfig, this.signer)
    this.gateway = new Gateway(networkConfig.appAuthUrl, networkConfig.verificationRpcUrl)
    this.connections = new Connections(networkConfig, this.account.rpcHelper, this.signer)
    this.filesystemChanges = new FilesystemChanges(networkConfig, this.account.rpcHelper, this.signer)
    this.verification = new Verification(networkConfig, this.account.rpcHelper, this.signer)
    this.farcasterClient = new FarcasterClient(networkConfig, new HttpClient(networkConfig.farcasterAuthApiUrl))
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
      FilesystemChanges: typeof import('./filesystem-changes').FilesystemChanges
      Config: typeof import('./network-config')
      Utils: typeof import('./utils')
      RpcHelperUtils: typeof RpcHelperUtils
      Wallet: typeof Wallet
      HDNodeWallet: typeof HDNodeWallet
      Verification: typeof import('./verification').Verification
      FarcasterClient: typeof import('./farcaster-client').FarcasterClient
      ethers: typeof ethers
    }
  }
}
