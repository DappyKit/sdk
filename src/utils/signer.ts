import { HDAccount } from 'viem/accounts'
import { ISigner } from '../service/delegated-fs/interfaces'

/**
 * Converts an account to a signer.
 * @param account HDAccount from the viem/accounts package
 */
export function accountToSigner(account: HDAccount): ISigner {
  return {
    signMessage: async (message: string | Uint8Array): Promise<string> => {
      const data = typeof message === 'string' ? { message } : { message: { raw: message } }

      return (await account.signMessage(data)) as string
    },
  }
}
