/**
 * Interface for the configuration object
 */
export interface INetworkConfig {
  /**
   * Name of the network
   */
  networkName: string
  /**
   * Id of the chain
   */
  chainId: number
  /**
   * Address of the account factory contract
   */
  accountFactoryAddress: string
  /**
   * Address of the entry point contract
   */
  entryPointAddress: string
  /**
   * Address of the social connections contract
   */
  socialConnectionsAddress: string
  /**
   * Address of the filesystem changes contract
   */
  filesystemChangesAddress: string
  /**
   * Address of the user verification contract
   */
  userVerificationAddress: string
  /**
   * URL of the app auth server
   */
  appAuthUrl: string
  /**
   * URL of the explorer with UserOperations
   */
  userOperationsExplorerUrl: string
  /**
   * URL of the explorer without UserOperations
   */
  simpleExplorerUrl: string
  /**
   * URL of the RPC server with UserOperations support
   */
  rpcUserOperationsUrl: string
  /**
   * DappyKit verification RPC URL
   */
  verificationRpcUrl: string
}
