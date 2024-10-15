import { english, generateMnemonic, HDAccount, mnemonicToAccount } from 'viem/accounts'

/**
 * Generate a random mnemonic phrase
 */
export function createRandomMnemonic(): string {
  return generateMnemonic(english)
}

/**
 * Generate a random wallet
 */
export function createRandomWallet(mnemonic?: string): HDAccount {
  return mnemonicToAccount(mnemonic ?? createRandomMnemonic())
}
