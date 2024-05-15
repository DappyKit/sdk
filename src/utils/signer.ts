import { ISigner } from '../service/delegated-fs/interfaces'
import type { Hash, SignableMessage } from 'viem/types/misc'

/**
 * Account signer interface.
 */
export interface IAccountSigner {
  signMessage: ({ message }: { message: SignableMessage }) => Promise<Hash>
}

/**
 * Converts an account to a signer.
 * @param account HDAccount from the viem/accounts package
 */
export function accountToSigner(account: IAccountSigner): ISigner {
  return {
    signMessage: async (message: string | Uint8Array): Promise<string> => {
      const data = typeof message === 'string' ? { message } : { message: { raw: message } }

      return (await account.signMessage(data)) as string
    },
  }
}
