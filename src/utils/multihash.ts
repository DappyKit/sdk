/**
 * Multihash interface
 * https://github.com/saurfang/ipfs-multihash-on-solidity/blob/master/README.md
 */
export interface Multihash {
  /**
   * Hash of the data
   */
  hash: string
  /**
   * Hash function
   */
  hashFunction: number
  /**
   * Size
   */
  size: number
}

/**
 * Gets a multihash from a hash
 * @param hash The hash
 */
export function getMultihash(hash: string): Multihash {
  return {
    hash,
    hashFunction: 12,
    size: 32,
  }
}
