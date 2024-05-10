import fetch from 'node-fetch'

export class HttpClient {
  constructor(public readonly baseUrl: string) {}

  /**
   * Gets the full URL for the given path
   * @param path Path to append to the base URL
   */
  getUrl(path: string): string {
    const url = new URL(path, this.baseUrl)

    return url.toString()
  }

  /**
   * Gets the JSON response for the given path
   * @param path Path to append to the base URL
   */
  async getJson<T>(path: string): Promise<T> {
    return (await (
      await fetch(this.getUrl(path), {
        method: 'GET',
      })
    ).json()) as T
  }

  /**
   * Posts the given form data to the given path and returns the JSON response
   * @param path Path to append to the base URL
   * @param body Body to send in the request
   */
  async postJson<T>(path: string, body: unknown): Promise<T> {
    return (await (
      await fetch(this.getUrl(path), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    ).json()) as T
  }

  async getText(path: string): Promise<string> {
    return await (
      await fetch(this.getUrl(path), {
        method: 'GET',
      })
    ).text()
  }
}
