export interface Bytes<Length extends number> extends Uint8Array {
  readonly length: Length
}

/**
 * Checks if the given value is a valid Bytes of the given length.
 * @param b Data to check
 * @param length Length of the Bytes
 */
export function isBytes<Length extends number>(b: unknown, length: Length): b is Bytes<Length> {
  return b instanceof Uint8Array && b.length === length
}

/**
 * Asserts that the given value is a valid Bytes of the given length.
 * @param b Data to check
 * @param length Length of the Bytes
 */
export function assertBytes<Length extends number>(b: unknown, length: Length): asserts b is Bytes<Length> {
  if (!isBytes(b, length)) {
    throw new TypeError(`Parameter is not valid Bytes of length: ${length} !== ${(b as Uint8Array).length}`)
  }
}

/**
 * Creates a new Bytes of the given length.
 * @param length Length of the Bytes
 */
export function makeBytes<Length extends number>(length: Length): Bytes<Length> {
  return new Uint8Array(length) as Bytes<Length>
}
