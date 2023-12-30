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
  async getJson(path: string): Promise<unknown> {
    return (
      await fetch(this.getUrl(path), {
        method: 'GET',
      })
    ).json()
  }

  /**
   * Posts the given form data to the given path and returns the JSON response
   * @param path Path to append to the base URL
   * @param formData Form data to post
   */
  async postJson(path: string, formData: FormData): Promise<unknown> {
    return (
      await fetch(this.getUrl(path), {
        method: 'POST',
        body: formData,
      })
    ).json()
  }
}
