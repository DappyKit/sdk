import { INetworkConfig } from '../network-config'
import { HDAccount } from 'viem/accounts'
import { Chain, createPublicClient, http, HttpTransport } from 'viem'
import { toSimpleSmartAccount, ToSimpleSmartAccountReturnType } from 'permissionless/accounts'
import { createSmartAccountClient, SmartAccountClient } from 'permissionless'
import { getChain } from '../utils/chain'
import { assertNotEmptySigner } from '../connections/utils'
import { entryPoint07Address, type SmartAccount } from 'viem/account-abstraction'

export type LightSmartAccountType = ToSimpleSmartAccountReturnType

export type SmartAccountClientType = SmartAccountClient<HttpTransport, Chain, SmartAccount>

export class RpcHelper {
  private account: LightSmartAccountType | undefined
  private accountClient: SmartAccountClientType | undefined

  constructor(
    public readonly config: INetworkConfig,
    public readonly eoaSigner?: HDAccount,
  ) {}

  /**
   * Get a public client for the network. No ability to sign transactions.
   */
  getPublicClient() {
    return createPublicClient({
      chain: getChain(this.config.chainId),
      transport: http(),
    })
  }

  /**
   * Get smart account instance. With ability to sign transactions.
   */
  async getAccount(): Promise<LightSmartAccountType> {
    assertNotEmptySigner(this.eoaSigner)

    if (!this.account) {
      this.account = await toSimpleSmartAccount({
        owner: this.eoaSigner,
        client: this.getPublicClient(),
        entryPoint: {
          address: entryPoint07Address,
          version: '0.7',
        },
      })
    }

    return this.account
  }

  /**
   * Get the account client to perform operations from the smart account
   */
  async getAccountClient(): Promise<SmartAccountClientType> {
    if (!this.accountClient) {
      const account = await this.getAccount()
      this.accountClient = createSmartAccountClient({
        account,
        chain: getChain(this.config.chainId),
        bundlerTransport: http(this.config.rpcUserOperationsUrl),
        // middleware: {
        //   gasPrice: async () => {
        //     return (await bundlerClient.getUserOperationGasPrice()).fast
        //   },
        //   sponsorUserOperation: paymasterClient.sponsorUserOperation,
        // },
      })
    }

    return this.accountClient
  }
}
