import { prepareEthAddress, prepareEthSignature } from '../../utils/eth'
import {
  DEFAULT_DELEGATED_FS_OPTIONS,
  IDecentralizedStorage,
  IDelegatedFsOptions,
  ILocalDataManager,
  ISigner,
} from './interfaces'

/**
 * Delegated file system.
 */
export class DelegatedFs {
  public readonly KEY_RESULT_DATA = 'result-data'
  public readonly KEY_USER_APP_DATA_ITEM = 'user-app-data-item'
  private options: Required<IDelegatedFsOptions>

  constructor(
    public localDataManager: ILocalDataManager,
    public decentralizedStorage: IDecentralizedStorage,
    public authServiceAddress: string,
    options?: IDelegatedFsOptions,
  ) {
    this.authServiceAddress = prepareEthAddress(authServiceAddress)
    this.options = { ...DEFAULT_DELEGATED_FS_OPTIONS, ...options }
  }

  /**
   * Signs the data with the nonce and returns the signature.
   * @param data Data
   * @param nonce Nonce
   * @param signer Signer
   */
  static async getDataSignature(data: string, nonce: number, signer: ISigner): Promise<string> {
    const messageToSign = `${nonce}${data}`
    const signature = await signer.signMessage(messageToSign)

    return prepareEthSignature(signature)
  }

  /**
   * Returns the text to sign for the delegated address.
   * @param userAddress User address
   * @param userDelegatedAddress User delegated address
   * @param applicationAddress Application address
   */
  static getDelegatedText(userAddress: string, userDelegatedAddress: string, applicationAddress: string): string {
    userAddress = prepareEthAddress(userAddress)
    userDelegatedAddress = prepareEthAddress(userDelegatedAddress)
    applicationAddress = prepareEthAddress(applicationAddress)
    const addresses = new Set([userAddress, userDelegatedAddress, applicationAddress])

    if (addresses.size !== 3) {
      throw new Error('Delegated text addresses must be unique')
    }

    return `${userAddress}${userDelegatedAddress}${applicationAddress}`
  }

  /**
   * Creates a signature for the delegated address.
   * @param userAddress User address
   * @param userDelegatedAddress User delegated address
   * @param applicationAddress Application address
   * @param signer Signer
   */
  static async createDelegateSignature(
    userAddress: string,
    userDelegatedAddress: string,
    applicationAddress: string,
    signer: ISigner,
  ): Promise<string> {
    return prepareEthSignature(
      await signer.signMessage(DelegatedFs.getDelegatedText(userAddress, userDelegatedAddress, applicationAddress)),
    )
  }
}
