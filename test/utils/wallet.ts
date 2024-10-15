import { english, generateMnemonic, HDAccount, mnemonicToAccount } from 'viem/accounts'
import { ISigner } from '../../src/service/delegated-fs/interfaces'

/**
 * ISigner with address
 */
interface ISignerWithAddress extends ISigner {
  address: string
}

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

/**
 * Create a ISigner wallet
 * @param mnemonic Mnemonic phrase
 */
export function createISignerWallet(mnemonic?: string): ISignerWithAddress {
  const wallet = createRandomWallet(mnemonic)

  return {
    signMessage: async message => {
      const data = typeof message === 'string' ? message : Buffer.from(message).toString('hex')

      return wallet.signMessage({ message: data })
    },
    address: wallet.address,
  }
}
