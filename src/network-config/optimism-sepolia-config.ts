import { INetworkConfig } from './INetworkConfig'

/**
 * Configuration for the Optimism Sepolia network
 */
export const optimismSepoliaConfig: INetworkConfig = {
  networkName: 'Optimism Sepolia',
  chainId: 11155420,
  /**
   * The Simple Account offers a more basic implementation for wallet contracts.
   * It is straightforward and easy to use, making it suitable for testing purposes.
   * We recommend using Light Account in production.
   *
   * https://docs.alchemy.com/reference/factory-addresses#testnet-deployments
   */
  accountFactoryAddress: '0x9406Cc6185a346906296840746125a0E44976454',
  /**
   * https://docs.alchemy.com/reference/eth-supportedentrypoints
   */
  entryPointAddress: '0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789',
  socialConnectionsAddress: '0xB7C1C10A71d3C90f42351bec7E4BCd647C992743',
  filesystemChangesAddress: '0x55043C8f3e8Ec55D2d60Acef83024F3b6da5AAf0',
  appAuthUrl: 'https://dappy.in',
  rpcUserOperationsUrl: 'https://opt-sepolia.g.alchemy.com/v2/vzozB27YgXBN9bXvQh5_AeyWVjDmfqGF',
  userOperationsExplorerUrl: '',
  simpleExplorerUrl: 'https://sepolia-optimistic.etherscan.io',
  verificationRpcUrl: 'https://verify-api-test.dappykit.org',
  farcasterAuthApiUrl: '',
  farcasterAuthFrameUrl: '',
}
