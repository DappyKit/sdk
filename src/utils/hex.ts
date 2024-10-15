import { BrandedType, FlavoredType } from './type'
import { Bytes, makeBytes } from './bytes'

export type HexString<Length extends number = number> = FlavoredType<string & { readonly length: Length }, 'HexString'>

export function hexToBytes<Length extends number, LengthHex extends number = number>(
  hex: HexString<LengthHex>,
): Bytes<Length> {
  assertHexString(hex)

  const bytes = makeBytes(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    const hexByte = hex.substr(i * 2, 2)
    bytes[i] = parseInt(hexByte, 16)
  }

  return bytes as Bytes<Length>
}

export function isHexString<Length extends number = number>(s: unknown, len?: number): s is HexString<Length> {
  return typeof s === 'string' && /^[0-9a-f]+$/i.test(s) && (!len || s.length === len)
}

export function assertHexString<Length extends number = number>(
  s: unknown,
  len?: number,
  name = 'value',
): asserts s is HexString<Length> {
  if (!isHexString(s, len)) {
    if (isPrefixedHexString(s)) {
      throw new TypeError(`${name} not valid non prefixed hex string (has 0x prefix): ${s}`)
    }

    // Don't display length error if no length specified in order not to confuse user
    const lengthMsg = len ? ` of length ${len}` : ''
    throw new TypeError(`${name} not valid hex string${lengthMsg}: ${s}`)
  }
}

export function intToHex<Length extends number = number>(int: number, len?: Length): HexString<Length> {
  if (!Number.isInteger(int)) throw new TypeError('the value provided is not integer')

  if (int > Number.MAX_SAFE_INTEGER) throw new TypeError('the value provided exceeds safe integer')

  if (int < 0) throw new TypeError('the value provided is a negative integer')
  const hex = int.toString(16) as HexString<Length>

  if (len && hex.length !== len) {
    throw new TypeError(`Resulting HexString does not have expected length ${len}: ${hex}`)
  }

  return hex
}
export function bytesToHex<Length extends number = number>(bytes: Uint8Array, len?: Length): HexString<Length> {
  const hexByte = (n: number) => n.toString(16).padStart(2, '0')
  const hex = Array.from(bytes, hexByte).join('') as HexString<Length>

  if (len && hex.length !== len) {
    throw new TypeError(`Resulting HexString does not have expected length ${len}: ${hex}`)
  }

  return hex
}

export type PrefixedHexString = BrandedType<string, 'PrefixedHexString'>

export function isPrefixedHexString(s: unknown): s is PrefixedHexString {
  return typeof s === 'string' && /^0x[0-9a-f]+$/i.test(s)
}

export function makeHexString<L extends number>(input: string | number | Uint8Array | unknown, len?: L): HexString<L> {
  if (typeof input === 'number') {
    return intToHex<L>(input, len)
  }

  if (input instanceof Uint8Array) {
    return bytesToHex<L>(input, len)
  }

  if (typeof input === 'string') {
    if (isPrefixedHexString(input)) {
      const hex = input.slice(2) as HexString<L>

      if (len && hex.length !== len) {
        throw new TypeError(`Length mismatch for valid hex string. Expecting length ${len}: ${hex}`)
      }

      return hex
    } else {
      // We use assertHexString() as there might be more reasons why a string is not valid hex string
      // and usage of isHexString() would not give enough information to the user on what is going
      // wrong.
      assertHexString<L>(input, len)

      return input
    }
  }

  throw new TypeError('Not HexString compatible type!')
}

export function is0xHexString(s: unknown, len?: number): s is string {
  if (typeof s !== 'string') {
    return false
  }

  // Remove the '0x' prefix if present
  const hexString = s.startsWith('0x') ? s.substring(2) : s

  return isHexString(hexString, len)
}
