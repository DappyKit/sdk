import { accountToSigner } from '../../../src/utils/signer'
import { mnemonicToAccount } from 'viem/accounts'

describe('Signer Utils', () => {
  it('accountToSigner', async () => {
    const account = mnemonicToAccount(
      'mad rule wedding badge kick symbol close acid fat staff carry fitness bottom system ensure account aisle note question target swallow hamster plate fetch',
    )
    const signer = accountToSigner(account)
    const data = 'Hello world!'
    const expectedSignature =
      '0x7b1f5bd7342faeb542fa9f45239c6c723252d6cdf7259e70522e3464476ab7c77859f307e1b70651210c87403c14c821390ee25383cbac3b610f0c409c99c1dc1c'
    expect(await signer.signMessage(data)).toEqual(expectedSignature)
    expect(await signer.signMessage(new TextEncoder().encode(data))).toEqual(expectedSignature)
  })
})
