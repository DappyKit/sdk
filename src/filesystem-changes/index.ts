import { Contract } from '@ethersproject/contracts'
import { IConfig } from '../config'
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
    public readonly config: IConfig,
    public rpcHelper: RpcHelper,
    public signer: SmartAccountSigner,
  ) {
    this.contract = new Contract(config.filesystemChangesAddress, abi, rpcHelper.smartAccountSigner)
  }

  /**
   * Sets user changes multihash
   * @param multihash Multihash
   */
  async setUserChange(multihash: Multihash): Promise<TransactionResponse> {
    assertNotEmptySigner(this.signer)
    const data = this.contract.interface.encodeFunctionData('setUserChange', [multihash])

    return this.rpcHelper.smartAccountSigner.sendTransaction({
      from: await this.signer.getAddress(),
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

    return this.rpcHelper.smartAccountSigner.sendTransaction({
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

    return this.rpcHelper.smartAccountSigner.sendTransaction({
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
    const data = await this.contract.callStatic.userChanges(address)

    return {
      hash: data.hash,
      hashFunction: data.hashFunction,
      size: data.size,
    }
  }

  /**
   * Gets service change multihash
   * @param address Address of the service
   */
  async getServiceChangeMultihash(address: string): Promise<Multihash> {
    const data = await this.contract.callStatic.serviceChanges(address)

    return {
      hash: data.hash,
      hashFunction: data.hashFunction,
      size: data.size,
    }
  }
}
