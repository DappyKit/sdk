import { GatewayUser } from './gateway-user'
import { AppParams, AuthStrategy, GetAuthUrlOptions } from './interface'
import { APP_ID_PARAM, AUTH_APP_SIGNER_ADDRESS_PARAM, AUTH_STRATEGY_PARAM, GATEWAY_AUTH_PATH } from '../utils/url'
import { parseAppParams, USER_PREFIX_PATH } from './utils'
import { assert0xEthAddress } from '../utils/eth'
import { HttpClient } from '../http-client/http-client'
import { GatewayVerification } from './gateway-verification'

export { GatewayUser, GatewayVerification }

export class Gateway {
  public readonly user: GatewayUser
  public readonly verification: GatewayVerification
  public readonly gatewayHttpClient: HttpClient

  constructor(
    private gatewayUrl: string,
    private verificationRpcUrl: string,
  ) {
    this.gatewayHttpClient = new HttpClient(this.gatewayUrl)
    this.user = new GatewayUser(new HttpClient(this.gatewayHttpClient.getUrl(USER_PREFIX_PATH)))
    this.verification = new GatewayVerification(new HttpClient(this.verificationRpcUrl))
  }

  /**
   * Generates an authentication URL for the given app ID and options.
   *
   * @param {number} appId - The ID of the app.
   * @param {Object} [options] - The options for generating the authentication URL.
   * @param {string} [options.authStrategy=AuthStrategy.GET_ACCOUNT] - The authentication strategy to be used.
   * @param {string} [options.appSignerAddress] - The address that manages data on behalf of the user within the application.
   * @returns {string} The generated authentication URL.
   */
  getAuthUrl(appId: number, options?: GetAuthUrlOptions): string {
    const url = new URL(GATEWAY_AUTH_PATH, this.gatewayUrl)
    url.searchParams.set(APP_ID_PARAM, appId.toString())
    url.searchParams.set(AUTH_STRATEGY_PARAM, options?.authStrategy || AuthStrategy.GET_ACCOUNT)

    // an address that manages data on behalf of the user within the application
    if (options?.appSignerAddress) {
      assert0xEthAddress(options?.appSignerAddress)
      url.searchParams.set(AUTH_APP_SIGNER_ADDRESS_PARAM, options.appSignerAddress)
    }

    return url.toString()
  }

  /**
   * Parses application parameters from a string.
   *
   * @param {string} data - The string containing the application parameters.
   *
   * @returns {AppParams} - The parsed application parameters.
   * @throws {Error} - If the version is missing or if the parameters are invalid.
   */
  parseAppParams(data: string): AppParams {
    return parseAppParams(data)
  }
}
