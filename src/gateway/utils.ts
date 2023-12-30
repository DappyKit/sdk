import { AppParams, AppParamsResult } from './interface'
import { assert0xEthAddress } from '../utils/eth'

export const USER_PREFIX_PATH = 'user'

/**
 * Parses the given data and returns the parsed app parameters.
 *
 * @param {string} data - The input data to be parsed.
 * @return {AppParams} The parsed app parameters.
 * @throws {Error} If the version is missing or has an invalid format, or if the parameters are invalid.
 */
export function parseAppParams(data: string): AppParams {
  const params = new URLSearchParams(data)
  const version = params.get('v') || ''
  const result = params.get('result') as AppParamsResult
  const smartAccountAddress = params.get('sad')
  const error = params.get('error')
  const signature = params.get('signature')
  const dateUntil = params.get('dateUntil')

  // Regular expression for version format: one or more numbers separated by dots
  const versionRegex = /^\d+(\.\d+)*$/

  if (!version) {
    throw new Error('Version is required')
  }

  if (!versionRegex.test(version)) {
    throw new Error('Invalid version format')
  }

  const parsedParams: AppParams = { version, result }

  if (result === AppParamsResult.OK) {
    assert0xEthAddress(smartAccountAddress)

    if (!signature) {
      throw new Error('Signature is required')
    }

    if (!dateUntil) {
      throw new Error('Date until is required')
    }

    if (!/^\d+$/.test(dateUntil)) {
      throw new Error('Date until must be a number')
    }

    parsedParams.smartAccountAddress = smartAccountAddress
    parsedParams.signature = signature
    parsedParams.dateUntil = Number(dateUntil)
  } else if (result === AppParamsResult.ERROR && error) {
    parsedParams.error = error
  } else {
    throw new Error('Invalid parameters')
  }

  return parsedParams
}
