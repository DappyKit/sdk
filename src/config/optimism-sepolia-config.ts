import { IConfig } from './IConfig'

/**
 * Configuration for the Optimism Sepolia network
 */
export const optimismSepoliaConfig: IConfig = {
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
  socialConnectionsAddress: '0xD8FC858221428B6b8ce304CE7aF1E838067Ea806',
  filesystemChangesAddress: '0x204B8968E70084cDCBad327614334F1D7553aaF2',
  userVerificationAddress: '0xBA44aaa2809931401ec099D798A5376cd678a12a',
  appAuthUrl: 'https://dappy.in',
  rpcUserOperationsUrl: 'https://opt-sepolia.g.alchemy.com/v2/vzozB27YgXBN9bXvQh5_AeyWVjDmfqGF',
  rpcSimpleUrl: 'https://sepolia.optimism.io',
  userOperationsExplorerUrl: '',
  simpleExplorerUrl: 'https://sepolia-optimistic.etherscan.io',
}
