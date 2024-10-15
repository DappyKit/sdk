import { INetworkConfig } from './INetworkConfig'

export const fraxtalMainnetConfig: INetworkConfig = {
  networkName: 'Fraxtal Mainnet',
  chainId: 252,
  accountFactoryAddress: '0x00004EC70002a32400f8ae005A26081065620D20',
  /**
   * https://docs.alchemy.com/reference/eth-supportedentrypoints (v0.6.0)
   */
  entryPointAddress: '0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789',
  /**
   * Create2 Address of Social Connections contract
   */
  socialConnectionsAddress: '0xB7C1C10A71d3C90f42351bec7E4BCd647C992743',
  /**
   * Create2 Address of Filesystem Changes contract
   */
  filesystemChangesAddress: '0x55043C8f3e8Ec55D2d60Acef83024F3b6da5AAf0',
  appAuthUrl: 'https://dappy.in',
  rpcUserOperationsUrl: '',
  userOperationsExplorerUrl: '',
  simpleExplorerUrl: 'https://fraxscan.com/',
  verificationRpcUrl: 'https://verify.dappykit.org',
  farcasterAuthFrameUrl: 'https://farcaster-auth-frame.dappykit.org',
  farcasterAuthApiUrl: 'https://farcaster-auth-api.dappykit.org',
}
