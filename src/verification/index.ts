import { INetworkConfig } from '../network-config'
import { RpcHelper } from '../rpc-helper'
import { SmartAccountSigner } from '@alchemy/aa-core'
import { Contract } from '@ethersproject/contracts'
import abi from './UserVerificationABI.json'

/**
 * Methods for verification checks
 */
export class Verification {
  constructor(
    public readonly config: INetworkConfig,
    public rpcHelper: RpcHelper,
    public signer: SmartAccountSigner,
  ) {}

  /**
   * Check if the smart account is verified by the verifier
   * @param smartAccountAddress Smart account address
   * @param verifierAddress Verifier address
   */
  async getIsVerified(smartAccountAddress: string, verifierAddress: string): Promise<boolean> {
    try {
      return (await this.getTokenId(smartAccountAddress, verifierAddress)) !== '0'
    } catch (e) {
      return false
    }
  }

  /**
   * Get the token ID of the smart account
   * @param smartAccountAddress Smart account address
   * @param verifierAddress Verifier address
   */
  async getTokenId(smartAccountAddress: string, verifierAddress: string): Promise<string> {
    const contract = new Contract(verifierAddress, abi, this.rpcHelper.aaProvider)

    return (await contract.callStatic.getTokenId(smartAccountAddress)).toString()
  }

  /**
   * Check if the token is expired
   * @param tokenId Token ID
   * @param verifierAddress Verifier address
   */
  async isTokenExpired(tokenId: string, verifierAddress: string): Promise<boolean> {
    const contract = new Contract(verifierAddress, abi, this.rpcHelper.aaProvider)

    return contract.callStatic.isTokenExpired(tokenId)
  }

  /**
   * Get the time before the token expires in seconds
   * @param tokenId Token ID
   * @param verifierAddress Verifier address
   */
  async timeBeforeExpiration(tokenId: string, verifierAddress: string): Promise<number> {
    const contract = new Contract(verifierAddress, abi, this.rpcHelper.aaProvider)

    return Number(await contract.callStatic.timeBeforeExpiration(tokenId))
  }

  /**
   * Check if the token exists
   * @param tokenId Token ID
   * @param verifierAddress Verifier address
   */
  async tokenExists(tokenId: string, verifierAddress: string): Promise<boolean> {
    const contract = new Contract(verifierAddress, abi, this.rpcHelper.aaProvider)

    return contract.callStatic.tokenExists(tokenId)
  }

  /**
   * Check if the smart account is a manager
   * @param smartAccountAddress Smart account address
   * @param verifierAddress Verifier address
   */
  async isManager(smartAccountAddress: string, verifierAddress: string): Promise<boolean> {
    const contract = new Contract(verifierAddress, abi, this.rpcHelper.aaProvider)

    return contract.callStatic.isManager(smartAccountAddress)
  }

  /**
   * Get the default expiry duration
   * @param verifierAddress Verifier address
   */
  async getDefaultExpiryDuration(verifierAddress: string): Promise<number> {
    const contract = new Contract(verifierAddress, abi, this.rpcHelper.aaProvider)

    return Number(await contract.callStatic.defaultExpiryDuration())
  }
}
