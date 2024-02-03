import { getChain, SimpleSmartContractAccount, SmartAccountSigner } from '@alchemy/aa-core'
import { AccountSigner, EthersProviderAdapter } from '@alchemy/aa-ethers'
import { INetworkConfig } from '../network-config'
import { createAARpcProvider } from './utils'
import fetch from 'node-fetch'
// todo for viem http request, would be great to configure it more elegant
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.fetch = fetch.default || fetch

export class RpcHelper {
  public readonly aaProvider: EthersProviderAdapter
  public aaSigner: AccountSigner<SimpleSmartContractAccount>

  constructor(
    public readonly config: INetworkConfig,
    public readonly signer: SmartAccountSigner,
  ) {
    this.aaProvider = createAARpcProvider(config)
    const chain = getChain(this.config.chainId)
    this.aaSigner = this.aaProvider.connectToAccount(
      rpcClient =>
        new SimpleSmartContractAccount({
          entryPointAddress: this.config.entryPointAddress,
          chain,
          owner: this.signer,
          factoryAddress: this.config.accountFactoryAddress,
          rpcClient,
        }),
    )
  }
}
