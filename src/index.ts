import { Lib } from './lib'

// todo export all things that should be available for the user of the library
export { Lib }

declare global {
  interface Window {
    // todo change that name and in webpack.config.ts. It will be available as `window.wowLib`
    wowLib: {
      // todo change the name to the main class name. It will be available as `window.wowLib.Lib`
      Lib: typeof import('./lib').Lib
    }
  }
}
