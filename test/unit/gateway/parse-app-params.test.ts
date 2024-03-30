import { Gateway } from '../../../src'
import { AppParamsResult } from '../../../src/gateway/interface'
import { optimismSepoliaConfig } from '../../../src/network-config'

describe('Gateway parseAppParams', () => {
  const correctEthAddress = '0x4597b6281dDa29CA5a750CAe29Be3fd19c31727c'
  let gateway: Gateway

  beforeEach(() => {
    gateway = new Gateway(optimismSepoliaConfig.appAuthUrl, optimismSepoliaConfig.verificationRpcUrl)
  })

  it('should parse valid params with ok result', () => {
    const result = gateway.parseAppParams(`v=1&result=ok&sad=${correctEthAddress}&signature=0x123&dateUntil=1234567890`)
    expect(result).toEqual({
      version: '1',
      result: AppParamsResult.OK,
      signature: '0x123',
      dateUntil: 1234567890,
      smartAccountAddress: correctEthAddress,
    })
  })

  it('should parse valid params with error result', () => {
    const result = gateway.parseAppParams('v=1&result=error&error=Some error description')
    expect(result).toEqual({
      version: '1',
      result: AppParamsResult.ERROR,
      error: 'Some error description',
    })
  })

  it('should throw error for missing version', () => {
    expect(() => {
      gateway.parseAppParams(`result=ok&sad=${correctEthAddress}`)
    }).toThrow('Version is required')
  })

  it('should throw error for invalid smart account address', () => {
    expect(() => {
      gateway.parseAppParams('v=1&result=ok&sad=invalidAddress')
    }).toThrow('Expected a valid Ethereum address with 0x prefix')
  })

  it('should throw error for missing error message when result is error', () => {
    expect(() => {
      gateway.parseAppParams('v=1&result=error')
    }).toThrow('Invalid parameters')
  })

  it('should throw error for empty version', () => {
    expect(() => {
      gateway.parseAppParams('v=&result=ok&sad=0x11111111111111111111111111111111')
    }).toThrow('Version is required')
  })

  it('should throw error for invalid version format', () => {
    expect(() => {
      gateway.parseAppParams('v=abc&result=ok&sad=0x11111111111111111111111111111111')
    }).toThrow('Invalid version format')
  })

  it('should throw error for invalid version format 2', () => {
    expect(() => {
      gateway.parseAppParams('v=a&result=ok&sad=0x11111111111111111111111111111111')
    }).toThrow('Invalid version format')
  })

  it('should throw error for invalid version format 3', () => {
    expect(() => {
      gateway.parseAppParams('v=a.b&result=ok&sad=0x11111111111111111111111111111111')
    }).toThrow('Invalid version format')
  })

  it('should throw error for invalid version format 3', () => {
    expect(() => {
      gateway.parseAppParams('v=a.b.c&result=ok&sad=0x11111111111111111111111111111111')
    }).toThrow('Invalid version format')
  })

  it('should throw error for params with version and result but without smart account address', () => {
    expect(() => {
      gateway.parseAppParams('v=1&result=ok')
    }).toThrow('Expected a valid Ethereum address with 0x prefix')
  })

  it('should throw error for empty input string', () => {
    expect(() => {
      gateway.parseAppParams('')
    }).toThrow('Version is required')
  })

  it('should throw error for missing result', () => {
    expect(() => {
      gateway.parseAppParams('v=1&sad=0x11111111111111111111111111111111')
    }).toThrow('Invalid parameters')
  })

  it('should throw error for invalid result value', () => {
    expect(() => {
      gateway.parseAppParams('v=1&result=maybe&sad=0x11111111111111111111111111111111')
    }).toThrow('Invalid parameters')
  })

  it('should throw error for empty error message with error result', () => {
    expect(() => {
      gateway.parseAppParams('v=1&result=error&error=')
    }).toThrow('Invalid parameters')
  })

  it('should handle valid parameters with additional unnecessary parameters', () => {
    const result = gateway.parseAppParams(
      `v=1&result=ok&sad=${correctEthAddress}&signature=0x123&dateUntil=1234567890&extra=123`,
    )
    expect(result).toEqual({
      version: '1',
      result: AppParamsResult.OK,
      signature: '0x123',
      dateUntil: 1234567890,
      smartAccountAddress: correctEthAddress,
    })
  })

  it('should decode URL encoded error message', () => {
    const result = gateway.parseAppParams('v=1&result=error&error=Some%20error%20description')
    expect(result).toEqual({
      version: '1',
      result: AppParamsResult.ERROR,
      error: 'Some error description',
    })
  })
})
