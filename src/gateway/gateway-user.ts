import { assertUserInfo, UserInfo } from './user/interface'
import { assert0xEthAddress } from '../utils/eth'
import { HttpClient } from '../http-client/http-client'
import { METHOD_GET_USER_INFO } from './user/utils'

/**
 * Methods for users
 */
export class GatewayUser {
  public readonly version = '1'

  constructor(public readonly httpClient: HttpClient) {}

  /**
   * Gets the user info by address
   * @param address Address of the user
   */
  async getInfo(address: string): Promise<UserInfo> {
    assert0xEthAddress(address)
    const response = await this.httpClient.getJson(`${this.version}/${METHOD_GET_USER_INFO}/${address}`)
    assertUserInfo(response)

    return response
  }
}
