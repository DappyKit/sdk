export interface DappyAuthMockResponse {}

export interface DappyAuthMock {
  /**
   * Opens the url on the default browser. Not WebView.
   * @param url url to open
   */
  open: (url: string) => Promise<void>
}

// browser instance where DappyAuth is opened
export function createDappyAuthMock(): DappyAuthMock {
  return {
    open: async (url: string): Promise<void> => {
      // console.log('Auth mock opened url: ', url)
    },
  }
}
