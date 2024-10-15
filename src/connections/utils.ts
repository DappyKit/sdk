import { assertNotEmptyObject } from '../utils/type'
import { HDAccount } from 'viem/accounts'

/**
 * Asserts that a value is not empty and of type Signer.
 *
 * @param {unknown} value - The value to be checked.
 * @throws {Error} Throws an error with message 'Signer is required' if the value is empty.
 *
 * @returns {void}
 */
export function assertNotEmptySigner(value: unknown): asserts value is HDAccount {
  assertNotEmptyObject(value, 'Signer is required')
}
