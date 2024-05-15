import { accountToSigner } from '../../../src/utils/signer'
import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts'

describe('Signer Utils', () => {
  it('accountToSigner', async () => {
    const mnemonicAccount = mnemonicToAccount(
      'mad rule wedding badge kick symbol close acid fat staff carry fitness bottom system ensure account aisle note question target swallow hamster plate fetch',
    )
    const mneomincSigner = accountToSigner(mnemonicAccount)
    const data = 'Hello world!'
    const mnemonicExpectedSignature =
      '0x7b1f5bd7342faeb542fa9f45239c6c723252d6cdf7259e70522e3464476ab7c77859f307e1b70651210c87403c14c821390ee25383cbac3b610f0c409c99c1dc1c'
    const pkExpectedSignature =
      '0x70c712d08cccbf2491a28bb5179931efe38f49a4ef8b734234f1aba6c0e3cbcd3b04da26e38d7de2ac9db2d5db5034d4adc89f249534d1e554a84c7e7029697a1b'
    expect(await mneomincSigner.signMessage(data)).toEqual(mnemonicExpectedSignature)
    expect(await mneomincSigner.signMessage(new TextEncoder().encode(data))).toEqual(mnemonicExpectedSignature)

    const pkAccount = privateKeyToAccount('0x0c1b7ed369810bb8435c49e0156c0f4155d864ff55bf833460779e2182561a3f')
    const pkSigner = accountToSigner(pkAccount)
    expect(await pkSigner.signMessage(data)).toEqual(pkExpectedSignature)
    expect(await pkSigner.signMessage(new TextEncoder().encode(data))).toEqual(pkExpectedSignature)
  })
})
