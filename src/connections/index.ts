import { assert0xEthAddress } from '../utils/eth'
import { assertNotEmptySigner } from './utils'
import { SmartAccountSigner } from '@alchemy/aa-core'
import { IConfig } from '../config'
import { Contract } from '@ethersproject/contracts'
import abi from './abi.json'
import { Multihash } from '../utils/multihash'
import { parseUnits } from 'ethers'
import { RpcHelper } from '../rpc-helper'
import { type TransactionResponse } from '@ethersproject/providers'

export class Connections {
  public readonly contract: Contract
  constructor(
    public readonly config: IConfig,
    public rpcHelper: RpcHelper,
    public signer: SmartAccountSigner,
  ) {
    this.contract = new Contract(config.socialConnectionsAddress, abi, rpcHelper.smartAccountSigner)
  }

  /**
   * Sets the user connection multihash without a rollup gateway
   * @param multihash Multihash to set
   */
  async setUserConnection(multihash: Multihash): Promise<TransactionResponse> {
    assertNotEmptySigner(this.signer)
    const data = this.contract.interface.encodeFunctionData('setUserConnection', [multihash])

    return this.rpcHelper.smartAccountSigner.sendTransaction({
      from: await this.signer.getAddress(),
      to: this.config.socialConnectionsAddress,
      data,
      value: parseUnits('0', 'ether'),
    })
  }

  /**
   * Gets the user connection multihash without a rollup gateway
   * @param address Address of the user
   */
  async getUserConnectionMultihash(address: string): Promise<Multihash> {
    assert0xEthAddress(address)

    const data = await this.contract.functions.userConnections(address)

    return {
      hash: data.hash,
      hashFunction: data.hashFunction,
      size: data.size,
    }
  }
}
