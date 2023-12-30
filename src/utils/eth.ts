import { hexToBytes, is0xHexString, isHexString, makeHexString } from './hex'
import { assertBytes, Bytes } from './bytes'

const ETH_ADDR_BYTES_LENGTH = 20

export type EthAddress = Bytes<20>
export const ETH_ADDR_HEX_LENGTH = 40
export const ETH_ADDR_0X_HEX_LENGTH = 42

/**
 * Creates Ethereum address from the given value.
 * @param address Value to convert
 */
export function makeEthAddress(address: EthAddress | Uint8Array | string | unknown): EthAddress {
  if (typeof address === 'string') {
    const hexAddr = makeHexString(address, ETH_ADDR_HEX_LENGTH)
    const ownerBytes = hexToBytes<typeof ETH_ADDR_BYTES_LENGTH>(hexAddr)
    assertBytes(ownerBytes, ETH_ADDR_BYTES_LENGTH)

    return ownerBytes
  } else if (address instanceof Uint8Array) {
    assertBytes(address, ETH_ADDR_BYTES_LENGTH)

    return address
  }
  throw new TypeError('Invalid EthAddress')
}

/**
 * Checks if the given value is a valid Ethereum address without 0x.
 * @param value Value to check
 */
export function isEthAddress(value: unknown): value is EthAddress {
  return isHexString(value) && value.length === ETH_ADDR_HEX_LENGTH
}

/**
 * Checks if the given value is a valid Ethereum address with 0x prefix.
 * @param value Value to check
 */
export function is0xEthAddress(value: unknown): value is string {
  return is0xHexString(value) && value.length === ETH_ADDR_0X_HEX_LENGTH
}

/**
 * Asserts that the given value is a valid Ethereum address without 0x.
 * @param value Value to check
 */
export function assertHexEthAddress(value: unknown): asserts value is EthAddress {
  if (!isEthAddress(value)) {
    throw new Error('Expected a valid Ethereum address')
  }
}

/**
 * Asserts that the given value is a valid Ethereum address with 0x prefix.
 * @param value Value to check
 */
export function assert0xEthAddress(value: unknown): asserts value is string {
  if (!is0xEthAddress(value)) {
    throw new Error('Expected a valid Ethereum address with 0x prefix')
  }
}
