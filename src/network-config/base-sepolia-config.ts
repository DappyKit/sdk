import { INetworkConfig } from './INetworkConfig'

export const baseSepoliaConfig: INetworkConfig = {
  networkName: 'Base Sepolia',
  chainId: 84532,
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
  socialConnectionsAddress: '0x99583220489a0e4217911ECf50680918F6a8B958',
  filesystemChangesAddress: '0x30C974bE6581e3a00595d0b7C1ba7A8A91413e1f',
  appAuthUrl: 'https://dappy.in',
  rpcUserOperationsUrl: 'https://base-sepolia.g.alchemy.com/v2/ublj-ZfkDCQxMSsTq-SWrGfHrfvGY58d',
  userOperationsExplorerUrl: '',
  simpleExplorerUrl: 'https://sepolia-explorer.base.org',
  verificationRpcUrl: 'https://verify-api-test.dappykit.org',
  farcasterAuthApiUrl: '',
  farcasterAuthFrameUrl: '',
}
