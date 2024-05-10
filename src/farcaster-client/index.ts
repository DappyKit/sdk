import { INetworkConfig } from '../network-config'
import { HttpClient } from '../http-client/http-client'
import { DelegatedFs } from '../service/delegated-fs/delegated-fs'
import { ISigner } from '../service/delegated-fs/interfaces'
import { prepareEthAddress } from '../utils/eth'

export interface IUserInfo {
  nonce: number
}

export interface IGeneralResponse {
  status: string
  message?: string
}

export interface ICreateResponse {
  status: string
  requestId: number
  answer: number
  message?: string
}

export interface IGetProofResponse {
  /**
   * Status of the response
   */
  status: string
  /**
   * User main address in the form of hex without 0x prefix
   */
  userMainAddress: string
  /**
   * Delegated address which created by 3rd party application for the user
   */
  userDelegatedAddress: string
  /**
   * Application address in the form of hex without 0x prefix
   */
  applicationAddress: string
  /**
   * Authentication service proof in the form of hex without 0x prefix
   */
  authServiceProof: string
  /**
   * Proof signature from 3rd party service in the form of hex without 0x prefix
   */
  serviceProof: string
}

export class FarcasterClient {
  constructor(
    public readonly config: INetworkConfig,
    public readonly httpClient: HttpClient,
  ) {}

  /**
   * Returns the URL of the Farcaster Auth Frame
   */
  public getAuthFrameUrl(): string {
    return this.config.farcasterAuthApiUrl
  }

  /**
   * Checks that FID authorized in the application
   * @param fid FID of the user
   * @param applicationAddress Address of the app signer
   */
  public async isFidAuthorized(fid: number, applicationAddress: string): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
      await this.httpClient.postJson('v1/authorization/is-authorized', { fid, appSignerAddress: applicationAddress })
    ).isAuthorized
  }

  /**
   * Creates an authorization request.
   * @param messageBytesProof Proof of user's request to the app
   * @param userDelegatedAddress Address of a signer created for a user. ETH address with 0x prefix.
   * @param signer Service signer to sign the proof of the delegated address
   */
  public async createAuthRequest(
    messageBytesProof: string,
    userDelegatedAddress: string,
    signer: ISigner,
  ): Promise<ICreateResponse> {
    const serviceSignature = await signer.signMessage(prepareEthAddress(userDelegatedAddress))

    return this.httpClient.postJson<ICreateResponse>('v1/authorization/create', {
      messageBytesProof,
      userDelegatedAddress,
      serviceSignature,
    })
  }

  /**
   * Gets the user info in the application.
   * @param userAddress User address
   * @param applicationAddress Application address
   */
  public async getUserInfo(userAddress: string, applicationAddress: string): Promise<IUserInfo> {
    return this.httpClient.getJson<IUserInfo>(
      `v1/delegated-fs/get-user-info?userAddress=${userAddress}&applicationAddress=${applicationAddress}`,
    )
  }

  /**
   * Saves the user data in the application.
   * @param userAddress User address
   * @param applicationAddress Application address
   * @param data Data to save
   * @param authServiceProof Proof of the auth service to operate from delegated signer
   * @param userDelegatedSigner Delegated signer of the user
   */
  public async saveUserAppData(
    userAddress: string,
    applicationAddress: string,
    data: string,
    authServiceProof: string,
    userDelegatedSigner: ISigner,
  ): Promise<IGeneralResponse> {
    const { nonce } = await this.getUserInfo(userAddress, applicationAddress)
    const dataNonce = nonce + 1
    const applicationDelegateDataSignature = await DelegatedFs.getDataSignature(data, dataNonce, userDelegatedSigner)

    return this.httpClient.postJson<IGeneralResponse>('v1/delegated-fs/save', {
      data,
      userAddress,
      proof: {
        nonce: dataNonce,
        applicationAddress,
        authServiceProof,
        applicationDelegateDataSignature,
      },
    })
  }

  /**
   * Gets the user data in the application.
   * @param userAddress User address
   * @param applicationAddress Application address
   */
  public async getDataByAddress(userAddress: string, applicationAddress: string): Promise<string> {
    return this.httpClient.getText(
      `v1/delegated-fs/get-by-address?userAddress=${userAddress}&applicationAddress=${applicationAddress}`,
    )
  }

  /**
   * Gets the proof of the user's authorization.
   * @param userAddress User address
   * @param applicationAddress Application address
   */
  public async getAuthProofByAddress(userAddress: string, applicationAddress: string): Promise<IGetProofResponse> {
    return this.httpClient.getJson<IGetProofResponse>(
      `v1/authorization/get-proof?userAddress=${userAddress}&applicationAddress=${applicationAddress}`,
    )
  }
}
