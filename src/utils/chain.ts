import * as chains from 'viem/chains'
import { Chain } from 'viem'

/**
 * Get chain by id
 * @param chainId Chain id
 */
export function getChain(chainId: number): Chain {
  for (const chain of Object.values(chains)) {
    if ('id' in chain) {
      if (chain.id === chainId) {
        return chain
      }
    }
  }

  throw new Error(`Chain with id ${chainId} not found`)
}
