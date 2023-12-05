import { Lib } from '../../src'

describe('Hello', () => {
  it('Hello world', async () => {
    const lib = new Lib()
    expect(lib.helloWorld()).toBe('Hello world')
  })
})
