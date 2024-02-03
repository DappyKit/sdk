import { Contract } from '@ethersproject/contracts'
import { INetworkConfig } from '../network-config'
import { RpcHelper } from '../rpc-helper'
import { SmartAccountSigner } from '@alchemy/aa-core'
import abi from './abi.json'
import { Multihash } from '../utils/multihash'
import type { TransactionResponse } from '@ethersproject/providers'
import { assertNotEmptySigner } from '../connections/utils'
import { parseUnits } from 'ethers'

export class FilesystemChanges {
  /**
   * File System Changes contract
   */
  public readonly contract: Contract

  constructor(
    public readonly config: INetworkConfig,
    public rpcHelper: RpcHelper,
    public signer: SmartAccountSigner,
  ) {
    // instantiate the contract for read-only operations
    this.contract = new Contract(config.filesystemChangesAddress, abi, rpcHelper.aaProvider)
  }

  /**
   * Sets user changes multihash
   * @param multihash Multihash
   */
  async setUserChange(multihash: Multihash): Promise<TransactionResponse> {
    assertNotEmptySigner(this.signer)
    const data = this.contract.interface.encodeFunctionData('setUserChange', [multihash])

    return this.rpcHelper.aaSigner.sendTransaction({
      from: await this.rpcHelper.aaSigner.getAddress(),
      to: this.config.filesystemChangesAddress,
      data,
      value: parseUnits('0', 'ether'),
    })
  }

  /**
   * Sets service changes multihash
   * @param multihash Multihash
   */
  async setServiceChange(multihash: Multihash): Promise<TransactionResponse> {
    assertNotEmptySigner(this.signer)
    const data = this.contract.interface.encodeFunctionData('setServiceChange', [multihash])

    return this.rpcHelper.aaSigner.sendTransaction({
      from: await this.signer.getAddress(),
      to: this.config.filesystemChangesAddress,
      data,
      value: parseUnits('0', 'ether'),
    })
  }

  /**
   * Removes user changes multihash
   * @param isService Is service or user
   */
  async removeChange(isService: boolean): Promise<TransactionResponse> {
    assertNotEmptySigner(this.signer)
    const data = this.contract.interface.encodeFunctionData('removeChange', [isService])

    return this.rpcHelper.aaSigner.sendTransaction({
      from: await this.signer.getAddress(),
      to: this.config.filesystemChangesAddress,
      data,
      value: parseUnits('0', 'ether'),
    })
  }

  /**
   * Gets user change multihash
   * @param address Address of the user
   */
  async getUserChangeMultihash(address: string): Promise<Multihash> {
    const { hash, hashFunction, size } = await this.contract.callStatic.userChanges(address)

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
    const { hash, hashFunction, size } = await this.contract.callStatic.serviceChanges(address)

    return {
      hash,
      hashFunction,
      size,
    }
  }
}
