import { assert0xEthAddress } from '../utils/eth'
import { INetworkConfig } from '../network-config'
import abi from './abi.json'
import { Multihash } from '../utils/multihash'
import { RpcHelper } from '../rpc-helper'
import { HDAccount } from 'viem/accounts'
import { encodeFunctionData, getContract, Hash, parseEther } from 'viem'
import { assertNotEmptySigner } from './utils'
import { Abi } from 'abitype'

export class Connections {
  constructor(
    public readonly config: INetworkConfig,
    public rpcHelper: RpcHelper,
    public signer?: HDAccount,
  ) {}

  getTheContract() {
    return getContract({
      address: this.config.socialConnectionsAddress as `0x${string}`,
      abi: abi as Abi,
      client: {
        public: this.rpcHelper.getPublicClient(),
      },
    })
  }

  /**
   * Sets the user connection multihash without a rollup gateway
   * @param multihash Multihash
   */
  async setUserConnection(multihash: Multihash): Promise<Hash> {
    assertNotEmptySigner(this.signer)

    const data = encodeFunctionData({
      abi: this.getTheContract().abi,
      functionName: 'setUserConnection',
      args: [multihash],
    })

    return (await this.rpcHelper.getAccountClient()).sendTransaction({
      to: this.config.socialConnectionsAddress as `0x${string}`,
      value: parseEther('0'),
      data,
    })
  }

  /**
   * Sets the service connection multihash
   * @param multihash Multihash
   */
  async setServiceConnection(multihash: Multihash): Promise<Hash> {
    assertNotEmptySigner(this.signer)
    const data = encodeFunctionData({
      abi: this.getTheContract().abi,
      functionName: 'setServiceConnection',
      args: [multihash],
    })

    return (await this.rpcHelper.getAccountClient()).sendTransaction({
      to: this.config.socialConnectionsAddress as `0x${string}`,
      value: parseEther('0'),
      data,
    })
  }

  /**
   * Gets the user connection multihash
   * @param address Address of the user
   */
  async getUserConnectionMultihash(address: string): Promise<Multihash> {
    assert0xEthAddress(address)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [hash, hashFunction, size] = await this.getTheContract().read.userConnections([address])

    return {
      hash,
      hashFunction,
      size,
    }
  }

  /**
   * Gets the service connection multihash
   * @param address Address of the service
   */
  async getServiceConnectionMultihash(address: string): Promise<Multihash> {
    assert0xEthAddress(address)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [hash, hashFunction, size] = await this.getTheContract().read.serviceConnections([address])

    return {
      hash,
      hashFunction,
      size,
    }
  }
}
