import { INetworkConfig } from './INetworkConfig'

/**
 * Configuration for the Optimism Mainnet network
 */
export const optimismMainnetConfig: INetworkConfig = {
  networkName: 'Optimism Mainnet',
  chainId: 10,
  /**
   * "The Light Account is an advanced smart account model, optimized for gas efficiency and security.
   * It is designed to be a robust and flexible alternative to traditional account models, suitable for a wide range
   * of applications. Light Account provides features like ERC-4337 compliance, security audits, and extendable
   * capabilities, making it an ideal choice for developers looking for a scalable and secure smart account solution.
   *
   * We recommend using Light Account in production."
   *
   * https://docs.alchemy.com/reference/factory-addresses
   */
  accountFactoryAddress: '0x00004EC70002a32400f8ae005A26081065620D20',
  /**
   * https://docs.alchemy.com/reference/eth-supportedentrypoints (v0.6.0)
   */
  entryPointAddress: '0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789',
  /**
   * Create2 Address of Social Connections contract
   */
  socialConnectionsAddress: '0x99583220489a0e4217911ECf50680918F6a8B958',
  /**
   * Create2 Address of Filesystem Changes contract
   */
  filesystemChangesAddress: '0x30C974bE6581e3a00595d0b7C1ba7A8A91413e1f',
  appAuthUrl: 'https://dappy.in',
  rpcUserOperationsUrl: 'https://opt-mainnet.g.alchemy.com/v2/ublj-ZfkDCQxMSsTq-SWrGfHrfvGY58d',
  userOperationsExplorerUrl: '',
  simpleExplorerUrl: 'https://explorer.optimism.io',
  verificationRpcUrl: 'https://verify.dappykit.org',
  farcasterAuthFrameUrl: 'https://farcaster-auth-frame.dappykit.org',
  farcasterAuthApiUrl: 'https://farcaster-auth-api.dappykit.org',
}
