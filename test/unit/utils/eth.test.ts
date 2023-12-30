import { assert0xEthAddress, assertHexEthAddress } from '../../../src/utils/eth'

describe('Eth Utils', () => {
  it('assertHexEthAddress', async () => {
    assertHexEthAddress('4597b6281dDa29CA5a750CAe29Be3fd19c31727c')
    expect(() => assertHexEthAddress('0x4597b6281dDa29CA5a750CAe29Be3fd19c31727c')).toThrowError(
      'Expected a valid Ethereum address',
    )
  })

  it('assert0xEthAddress', async () => {
    assert0xEthAddress('0x4597b6281dDa29CA5a750CAe29Be3fd19c31727c')
    expect(() => assert0xEthAddress('4597b6281dDa29CA5a750CAe29Be3fd19c31727c')).toThrowError(
      'Expected a valid Ethereum address with 0x prefix',
    )
  })
})
