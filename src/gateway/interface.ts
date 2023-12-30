/**
 * Options for getting the authentication URL.
 */
export interface GetAuthUrlOptions {
  /**
   * The authentication strategy to be used.
   */
  authStrategy: AuthStrategy
  /**
   * The address that manages data on behalf of the user within the application.
   */
  appSignerAddress?: string
}

export enum AuthStrategy {
  /**
   * Gets only the address of the user's Smart Account
   */
  GET_ACCOUNT = 'GET_ACCOUNT',
  /**
   * Gets the address of the user's Smart Account with a built-in verification process.
   */
  VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
}

/**
 * Parameters with which the app is opened
 */
export interface AppParams {
  /**
   * Version of the API
   */
  version: string
  /**
   * Type of the result
   */
  result: AppParamsResult
  /**
   * Signature of the string concatenated from the app signer and the date until
   */
  signature?: string
  /**
   * Date (UTC unix timestamp) until the signature is valid
   */
  dateUntil?: number
  /**
   * Smart Account address of the user
   */
  smartAccountAddress?: string
  /**
   * Error message
   */
  error?: string
}

/**
 * Type of the result
 */
export enum AppParamsResult {
  /**
   * The result is OK
   */
  OK = 'ok',
  /**
   * The result is ERROR
   */
  ERROR = 'error',
}
