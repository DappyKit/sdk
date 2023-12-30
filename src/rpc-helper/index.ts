import { getChain, SimpleSmartContractAccount, SmartAccountSigner } from '@alchemy/aa-core'
import { EthersProviderAdapter } from '@alchemy/aa-ethers'
import { IConfig } from '../config'
import { createRpcProvider } from './utils'
import fetch from 'node-fetch'
// todo for viem http request, would be great to configure it more elegant
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.fetch = fetch.default || fetch

export class RpcHelper {
  public readonly provider: EthersProviderAdapter
  public readonly smartAccountSigner
  constructor(config: IConfig, signer: SmartAccountSigner) {
    this.provider = createRpcProvider(config)
    const chain = getChain(config.chainId)
    this.smartAccountSigner = this.provider.connectToAccount(
      rpcClient =>
        new SimpleSmartContractAccount({
          entryPointAddress: config.entryPointAddress,
          chain,
          owner: signer,
          factoryAddress: config.accountFactoryAddress,
          rpcClient,
        }),
    )
  }
}
