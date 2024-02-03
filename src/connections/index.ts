import { assert0xEthAddress } from '../utils/eth'
import { assertNotEmptySigner } from './utils'
import { SmartAccountSigner } from '@alchemy/aa-core'
import { INetworkConfig } from '../network-config'
import { Contract } from '@ethersproject/contracts'
import abi from './abi.json'
import { Multihash } from '../utils/multihash'
import { parseUnits } from 'ethers'
import { RpcHelper } from '../rpc-helper'
import { type TransactionResponse } from '@ethersproject/providers'

export class Connections {
  public readonly contract: Contract
  constructor(
    public readonly config: INetworkConfig,
    public rpcHelper: RpcHelper,
    public signer: SmartAccountSigner,
  ) {
    // instantiate the contract for read-only operations
    this.contract = new Contract(config.socialConnectionsAddress, abi, rpcHelper.aaSigner)
  }

  /**
   * Sets the user connection multihash without a rollup gateway
   * @param multihash Multihash
   */
  async setUserConnection(multihash: Multihash): Promise<TransactionResponse> {
    assertNotEmptySigner(this.signer)
    const data = this.contract.interface.encodeFunctionData('setUserConnection', [multihash])

    return this.rpcHelper.aaSigner.sendTransaction({
      from: await this.signer.getAddress(),
      to: this.config.socialConnectionsAddress,
      data,
      value: parseUnits('0', 'ether'),
    })
  }

  /**
   * Sets the service connection multihash
   * @param multihash Multihash
   */
  async setServiceConnection(multihash: Multihash): Promise<TransactionResponse> {
    assertNotEmptySigner(this.signer)
    const data = this.contract.interface.encodeFunctionData('setServiceConnection', [multihash])

    return this.rpcHelper.aaSigner.sendTransaction({
      from: await this.signer.getAddress(),
      to: this.config.socialConnectionsAddress,
      data,
      value: parseUnits('0', 'ether'),
    })
  }

  /**
   * Gets the user connection multihash
   * @param address Address of the user
   */
  async getUserConnectionMultihash(address: string): Promise<Multihash> {
    assert0xEthAddress(address)

    const { hash, hashFunction, size } = await this.contract.functions.userConnections(address)

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

    const { hash, hashFunction, size } = await this.contract.functions.serviceConnections(address)

    return {
      hash,
      hashFunction,
      size,
    }
  }
}
