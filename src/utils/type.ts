import { Client, GetContractReturnType } from 'viem'
import { Abi } from 'abitype'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type ContractType = GetContractReturnType<Abi, Client, `0x${string}`>

export type FlavoredType<Type, Name> = Type & { __tag__?: Name }

export type BrandedType<Type, Name> = Type & { __tag__: Name }

/**
 * Asserts that the given value is a number
 */
export function assertNumber(value: unknown, customMessage?: string): asserts value is number {
  if (!isNumber(value)) {
    throw new Error(customMessage ? customMessage : 'Expected a number')
  }
}

/**
 * Asserts that the given value is an array
 */
export function assertArray(value: unknown): asserts value is [] {
  if (!Array.isArray(value)) {
    throw new Error('Expected an array')
  }
}

/**
 * Asserts that the given value is a string
 */
export function assertString(value: unknown, customMessage?: string): asserts value is string {
  if (!isString(value)) {
    throw new Error(customMessage ?? 'Expected a string')
  }
}

/**
 * Checks that value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Checks that value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

/**
 * Checks that value is an object
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isObject(value: unknown): value is object {
  return typeof value === 'object'
}

/**
 * Checks if the given value is an object and not empty
 *
 * @param value The value to check
 * @returns True if the value is an object and not empty, false otherwise
 */
export function isNotEmptyObject(value: unknown): boolean {
  return isObject(value) && value !== null && Object.keys(value as Record<string, unknown>).length > 0
}

/**
 * Asserts that a given value is a non-empty object, throwing an error if it is not.
 *
 * @param {unknown} value - The value to be checked.
 * @param {string} [customMessage] - An optional custom error message.
 *
 * @throws {Error} If the value is not a non-empty object.
 */
export function assertNotEmptyObject(value: unknown, customMessage?: string): asserts value is object {
  if (!isNotEmptyObject(value)) {
    throw new Error(customMessage ?? 'Expected a non-empty object')
  }
}
