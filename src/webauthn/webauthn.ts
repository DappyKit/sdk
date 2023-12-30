import { DERIVATION_DATA_V1 } from './utils'

/**
 * Webauthn class
 */
export class Webauthn {
  async signDerivationData(data = DERIVATION_DATA_V1): Promise<string> {
    // todo sign DERIVATION_DATA_V1 using webauthn
    // todo assert length >= 16 bytes
    throw new Error('Not implemented')
  }
}
