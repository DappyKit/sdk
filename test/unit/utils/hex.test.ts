import { is0xHexString } from '../../../src/utils/hex'

describe('Hex Utils', () => {
  it('is0xHexString', async () => {
    expect(is0xHexString('0x4597b6281dDa29CA5a750CAe29Be3fd19c31727c')).toBe(true)
  })
})
