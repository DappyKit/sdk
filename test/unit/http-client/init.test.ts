import { HttpClient } from '../../../src/http-client/http-client'

describe('Http Client', () => {
  it('get correct url for base without slash', async () => {
    const client = new HttpClient('https://google.com')
    expect(client.getUrl('test')).toEqual('https://google.com/test')
  })

  it('get correct url for base with slash', async () => {
    const client = new HttpClient('https://google.com/')
    expect(client.getUrl('test')).toEqual('https://google.com/test')
  })
})
