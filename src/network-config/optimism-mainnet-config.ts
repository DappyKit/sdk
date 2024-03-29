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
  socialConnectionsAddress: '0xD8FC858221428B6b8ce304CE7aF1E838067Ea806',
  filesystemChangesAddress: '0x204B8968E70084cDCBad327614334F1D7553aaF2',
  userVerificationAddress: '0xBA44aaa2809931401ec099D798A5376cd678a12a',
  appAuthUrl: 'https://dappy.in',
  rpcUserOperationsUrl: 'https://opt-mainnet.g.alchemy.com/v2/ublj-ZfkDCQxMSsTq-SWrGfHrfvGY58d',
  userOperationsExplorerUrl: '',
  simpleExplorerUrl: 'https://explorer.optimism.io/',
}
