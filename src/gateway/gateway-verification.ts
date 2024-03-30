import { assert0xEthAddress } from '../utils/eth'
import { HttpClient } from '../http-client/http-client'
import {
  INFO_PATH,
  METHOD_GET_SMART_ACCOUNT_INFO,
  METHOD_VERIFY_FARCASTER,
  METHOD_VERIFY_GOOGLE,
  VERIFY_PATH,
} from './verification/utils'
import { ISmartAccountInfoResponse, IVerifyResponse } from './verification/interface'

/**
 * Methods for verification
 */
export class GatewayVerification {
  public readonly version = 'v1'

  constructor(public readonly httpClient: HttpClient) {}

  /**
   * Gets smart account info by address of the EOA
   * @param address Address of the EOA
   */
  async getSmartAccountInfo(address: string): Promise<ISmartAccountInfoResponse> {
    assert0xEthAddress(address)

    return (await this.httpClient.getJson(
      `${this.version}/${INFO_PATH}/${METHOD_GET_SMART_ACCOUNT_INFO}?address=${address}`,
    )) as ISmartAccountInfoResponse
  }

  /**
   * Verifies Google data with the EOA signature
   * @param data Google data
   * @param eoaSignature EOA signature of the data
   * @param smartAccountAddress Smart account address, can be empty
   */
  async verifyGoogle(data: string, eoaSignature: string, smartAccountAddress?: string): Promise<IVerifyResponse> {
    return (await this.httpClient.postJson(`${this.version}/${VERIFY_PATH}/${METHOD_VERIFY_GOOGLE}`, {
      data,
      eoaSignature,
      smartAccountAddress,
    })) as IVerifyResponse
  }

  /**
   * Verifies Farcaster data
   * @param clickData Click data
   */
  async verifyFarcaster(clickData: string): Promise<IVerifyResponse> {
    return (await this.httpClient.postJson(`${this.version}/${VERIFY_PATH}/${METHOD_VERIFY_FARCASTER}`, {
      clickData,
    })) as IVerifyResponse
  }
}
