import { IConfig } from '../config'
import { JsonRpcProvider } from '@ethersproject/providers'
import { HDNodeWallet } from 'ethers'
import { SmartAccountSigner } from '@alchemy/aa-core'
import { SignTypedDataParameters } from 'viem/accounts'
import { EthersProviderAdapter } from '@alchemy/aa-ethers'

/**
 * Creates an EthersProviderAdapter from a config
 * @param config The config to use
 */
export function createRpcProvider(config: IConfig): EthersProviderAdapter {
  return EthersProviderAdapter.fromEthersProvider(new JsonRpcProvider(config.rpcUserOperationsUrl, config.chainId))
}

/**
 * Converts an Ethers HDNodeWallet to a SmartAccountSigner
 * @param wallet - the HDNodeWallet to convert
 * @returns {SmartAccountSigner} - a signer that can be used to sign and send user operations
 */
export const convertHDNodeWalletToAccountSigner = (wallet: HDNodeWallet): SmartAccountSigner<HDNodeWallet> => {
  return {
    inner: wallet,
    signerType: 'local',
    getAddress: async () => Promise.resolve(wallet.address as `0x${string}`),
    signMessage: async (msg: Uint8Array | string) => (await wallet.signMessage(msg)) as `0x${string}`,
    signTypedData: async (params: Omit<SignTypedDataParameters, 'privateKey'>) => {
      throw new Error('Converter for signTypedData is not implemented')
      // return (await wallet.signTypedData(params.domain ?? {}, params.types, params.message)) as `0x${string}`
    },
  }
}
