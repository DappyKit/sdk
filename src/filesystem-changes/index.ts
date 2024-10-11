import { INetworkConfig } from '../network-config'
import { RpcHelper } from '../rpc-helper'
import abi from './abi.json'
import { Multihash } from '../utils/multihash'
import { assertNotEmptySigner } from '../connections/utils'
import { encodeFunctionData, getContract, Hash, parseEther } from 'viem'
import { HDAccount } from 'viem/accounts'
import { assert0xEthAddress } from '../utils/eth'
import { Abi } from 'abitype'

export class FilesystemChanges {
  constructor(
    public readonly config: INetworkConfig,
    public rpcHelper: RpcHelper,
    public signer?: HDAccount,
  ) {}

  getTheContract() {
    return getContract({
      address: this.config.filesystemChangesAddress,
      abi: abi as Abi,
      client: {
        public: this.rpcHelper.getPublicClient(),
      },
    })
  }

  /**
   * Sets user changes multihash
   * @param multihash Multihash
   */
  async setUserChange(multihash: Multihash): Promise<Hash> {
    assertNotEmptySigner(this.signer)

    const data = encodeFunctionData({
      abi: this.getTheContract().abi,
      functionName: 'setUserChange',
      args: [multihash],
    })

    return (await this.rpcHelper.getAccountClient()).sendTransaction({
      to: this.config.filesystemChangesAddress,
      value: parseEther('0'),
      data,
    })
  }

  /**
   * Sets service changes multihash
   * @param multihash Multihash
   */
  async setServiceChange(multihash: Multihash): Promise<Hash> {
    assertNotEmptySigner(this.signer)

    const data = encodeFunctionData({
      abi: this.getTheContract().abi,
      functionName: 'setServiceChange',
      args: [multihash],
    })

    return (await this.rpcHelper.getAccountClient()).sendTransaction({
      to: this.config.filesystemChangesAddress,
      value: parseEther('0'),
      data,
    })
  }

  /**
   * Removes user changes multihash
   * @param isService Is service or user
   */
  async removeChange(isService: boolean): Promise<Hash> {
    assertNotEmptySigner(this.signer)

    const data = encodeFunctionData({
      abi: this.getTheContract().abi,
      functionName: 'removeChange',
      args: [isService],
    })

    return (await this.rpcHelper.getAccountClient()).sendTransaction({
      to: this.config.filesystemChangesAddress,
      value: parseEther('0'),
      data,
    })
  }

  /**
   * Gets user change multihash
   * @param address Address of the user
   */
  async getUserChangeMultihash(address: string): Promise<Multihash> {
    assert0xEthAddress(address)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [hash, hashFunction, size] = await this.getTheContract().read.userChanges([address])

    return {
      hash,
      hashFunction,
      size,
    }
  }

  /**
   * Gets service change multihash
   * @param address Address of the service
   */
  async getServiceChangeMultihash(address: string): Promise<Multihash> {
    assert0xEthAddress(address)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [hash, hashFunction, size] = await this.getTheContract().read.serviceChanges([address])

    return {
      hash,
      hashFunction,
      size,
    }
  }
}
