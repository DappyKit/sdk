import { INetworkConfig } from '../network-config'
import { RpcHelper } from '../rpc-helper'
import abi from './UserVerificationABI.json'
import { getContract } from 'viem'

/**
 * Methods for verification checks
 */
export class Verification {
  constructor(
    public readonly config: INetworkConfig,
    public rpcHelper: RpcHelper,
  ) {}

  private getCustomContract(address: string) {
    return getContract({
      address: address as `0x${string}`,
      abi,
      client: {
        public: this.rpcHelper.getPublicClient(),
      },
    })
  }

  /**
   * Check if the smart account is verified by the verifier
   * @param smartAccountAddress Smart account address
   * @param verifierAddress Verifier address
   */
  async getIsVerified(smartAccountAddress: string, verifierAddress: string): Promise<boolean> {
    try {
      return (await this.getTokenId(smartAccountAddress, verifierAddress)) !== '0'
      // eslint-disable-next-line unused-imports/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (await this.getCustomContract(verifierAddress).read.getTokenId([smartAccountAddress])).toString()
  }

  /**
   * Check if the token is expired
   * @param tokenId Token ID
   * @param verifierAddress Verifier address
   */
  async isTokenExpired(tokenId: string, verifierAddress: string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getCustomContract(verifierAddress).read.isTokenExpired([tokenId])
  }

  /**
   * Get the time before the token expires in seconds
   * @param tokenId Token ID
   * @param verifierAddress Verifier address
   */
  async timeBeforeExpiration(tokenId: string, verifierAddress: string): Promise<number> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Number(await this.getCustomContract(verifierAddress).read.timeBeforeExpiration([tokenId]))
  }

  /**
   * Check if the token exists
   * @param tokenId Token ID
   * @param verifierAddress Verifier address
   */
  async tokenExists(tokenId: string, verifierAddress: string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getCustomContract(verifierAddress).read.tokenExists([tokenId])
  }

  /**
   * Check if the smart account is a manager
   * @param smartAccountAddress Smart account address
   * @param verifierAddress Verifier address
   */
  async isManager(smartAccountAddress: string, verifierAddress: string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getCustomContract(verifierAddress).read.isManager([smartAccountAddress])
  }

  /**
   * Get the default expiry duration
   * @param verifierAddress Verifier address
   */
  async getDefaultExpiryDuration(verifierAddress: string): Promise<number> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Number(await this.getCustomContract(verifierAddress).read.defaultExpiryDuration())
  }
}
