import Path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, DefinePlugin, NormalModuleReplacementPlugin, WebpackPluginInstance } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import PackageJson from './package.json'
import * as glob from 'glob'

export async function getBrowserPathMapping(): Promise<{ [aliasNodeReference: string]: string }> {
  const browserSourceCodes = glob.sync('src/**/*.browser.ts').map(match => Path.resolve(__dirname, match))
  const codePathMapping: { [nodeFullPath: string]: string } = {}

  for (const browserFullPath of browserSourceCodes) {
    const filePathArray = browserFullPath.split('.')
    filePathArray.pop()
    filePathArray.pop() //remove 'browser.ts' from '**/*.browser.ts'
    const nodeFullPath = filePathArray.join('.')
    const aliasNodeReference = `/${nodeFullPath.split('/').pop()}$` //keep the last bit of node file referencing e.g. '/file-source$'

    codePathMapping[aliasNodeReference] = browserFullPath
  }

  return codePathMapping
}

interface WebpackEnvParams {
  target: 'web' | 'node'
  debug: boolean
  mode: 'production' | 'development'
  fileName: string
}

const base = async (env?: Partial<WebpackEnvParams>): Promise<Configuration> => {
  const isProduction = env?.mode === 'production'
  const isBrowser = env?.target === 'web'
  const filename =
    env?.fileName ||
    ['index', isBrowser ? '.browser' : null, isProduction ? '.min' : null, '.js'].filter(Boolean).join('')
  const entry = Path.resolve(__dirname, 'src')
  const path = Path.resolve(__dirname, 'dist')
  const target = env?.target || 'web' // 'node' or 'web'
  const plugins: WebpackPluginInstance[] = [
    new DefinePlugin({
      'process.env.ENV': env?.mode || 'development',
      'process.env.IS_WEBPACK_BUILD': 'true',
    }),
  ]

  if (target === 'web') {
    const browserPathMapping = await getBrowserPathMapping()
    // eslint-disable-next-line guard-for-in
    for (const nodeReference in browserPathMapping) {
      plugins.push(
        new NormalModuleReplacementPlugin(new RegExp(`\\${nodeReference}`), browserPathMapping[nodeReference]),
      )
    }
    // change node modules to browser modules according to packageJson.browser mapping
    // eslint-disable-next-line guard-for-in
    const browserModuleMapping = PackageJson.browser as { [key: string]: string }
    // eslint-disable-next-line guard-for-in
    for (const nodeReference in browserModuleMapping) {
      const browserReference: string = browserModuleMapping[nodeReference]
      plugins.push(new NormalModuleReplacementPlugin(new RegExp(`^${nodeReference}$`), browserReference))
    }
    // blob-polyfill references the document object which is not available in service worker scripts.
    // That's the reason why it is removed from the bundle
    plugins.push(
      new NormalModuleReplacementPlugin(/blob-polyfill/, Path.resolve(__dirname, 'src', 'polyfills', 'Blob.js')),
    )
  }

  return {
    externals: {
      '@scure/bip39/wordlists/korean': 'koreanWordlist',
      '@scure/bip39/wordlists/japanese': 'japaneseWordlist',
      '@scure/bip39/wordlists/french': 'frenchWordlist',
      '@scure/bip39/wordlists/italian': 'italianWordlist',
      '@scure/bip39/wordlists/spanish': 'spanishWordlist',
      '@scure/bip39/wordlists/czech': 'czechWordlist',
    },
    bail: Boolean(isProduction),
    mode: env?.mode || 'development',
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    entry,
    output: {
      path,
      filename,
      sourceMapFilename: filename + '.map',
      library: 'DappyKit',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          // include: entry,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        path: false,
        fs: false,
        stream: false,
        crypto: false,
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 2020,
            },
            compress: {
              ecma: 5,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
            },
            sourceMap: true,
          },
          // Use multi process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
        }),
      ],
    },
    plugins,
    target,
    node: {
      global: true,
      __filename: 'mock',
      __dirname: 'mock',
    },
    performance: {
      hints: false,
    },
  }
}

export default async (env?: Partial<WebpackEnvParams>): Promise<Configuration> => {
  // eslint-disable-next-line no-console
  console.log('webpack env', env)

  if (env?.debug) {
    return {
      ...(await base(env)),
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static', // Generates a static HTML file with the bundle report
          openAnalyzer: true, // Opens the report in your default browser automatically
        }),
      ],
      profile: true,
    }
  }

  return base(env)
}
