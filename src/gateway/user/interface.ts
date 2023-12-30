import { isNotEmptyObject, isString } from '../../utils/type'

/**
 * Information about user
 */
export interface UserInfo {
  /**
   * Version of the server
   */
  version: string
  /**
   * Smart Account address
   */
  address: string
  /**
   * User verification status
   */
  verification: UserVerification
}

/**
 * Checks that value is a UserInfo
 * @param value Value to check
 */
export function isUserInfo(value: unknown): value is UserInfo {
  const data = value as UserInfo

  return (
    isNotEmptyObject(value) && isString(data.version) && isString(data.address) && isNotEmptyObject(data.verification)
  )
}

/**
 * Asserts that value is a UserInfo
 * @param data Value to check
 */
export function assertUserInfo(data: unknown): asserts data is UserInfo {
  if (!isUserInfo(data)) {
    throw new Error('Invalid UserInfo')
  }
}

/**
 * User verification status
 */
export enum UserVerificationStatus {
  /**
   * User is not verified and not in the process of verification
   */
  IDLE = 'IDLE',
  /**
   * User is in the process of verification
   */
  PENDING = 'PENDING',
  /**
   * User is verified
   */
  DONE = 'DONE',
}

/**
 * User verification
 */
export interface UserVerification {
  /**
   * Verification on-chain has been successfully completed or not.
   *
   * @type {boolean}
   */
  onChainVerified: boolean
  /**
   * Explanation of the verification status.
   */
  status: UserVerificationStatus
}
