import { INetworkConfig } from '../network-config'
import { HDAccount } from 'viem/accounts'
import { Chain, createPublicClient, http, HttpTransport } from 'viem'
import { LightSmartAccount, signerToLightSmartAccount } from 'permissionless/accounts'
import { createSmartAccountClient, ENTRYPOINT_ADDRESS_V06, SmartAccountClient } from 'permissionless'
import { ENTRYPOINT_ADDRESS_V06_TYPE } from 'permissionless/types'
import { getChain } from '../utils/chain'
import { assertNotEmptySigner } from '../connections/utils'

export type LightSmartAccountType = LightSmartAccount<ENTRYPOINT_ADDRESS_V06_TYPE, HttpTransport, Chain>

// prettier-ignore
export type SmartAccountClientType = SmartAccountClient<ENTRYPOINT_ADDRESS_V06_TYPE, HttpTransport, Chain, LightSmartAccountType>

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
      this.account = await signerToLightSmartAccount(this.getPublicClient(), {
        signer: this.eoaSigner,
        entryPoint: ENTRYPOINT_ADDRESS_V06,
        lightAccountVersion: '1.1.0',
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
        entryPoint: ENTRYPOINT_ADDRESS_V06,
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
