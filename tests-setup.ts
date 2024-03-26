import fetch from 'node-fetch'
import 'dotenv/config'
import { isNoMnemonic } from './test/utils/sdk'

export default async function testsSetup(): Promise<void> {
  // await assertRpcAvailable()
  assertTestnetMnemonic()
}

/**
 * Assert that mnemonic is set in the env file
 */
function assertTestnetMnemonic(): void {
  if (isNoMnemonic()) {
    throw new Error('Testnet mnemonic is not set in env file. It is required for tests to run.')
  }
}

export async function assertRpcAvailable(): Promise<void> {
  const rpcUrl = process.env.RPC_URL || 'http://localhost:8545'

  // eslint-disable-next-line no-console
  console.log('\nChecking blockchain connection...')
  try {
    const data = await fetch(rpcUrl)

    if ((await data.text()).indexOf('jsonrpc') === -1) {
      throw new Error('Response of RPC is not valid')
    }
  } catch (e) {
    throw new Error(`Blockchain connection failed: ${(e as Error).message}`)
  }
}
