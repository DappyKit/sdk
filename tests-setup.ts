import fetch from 'node-fetch'
import 'dotenv/config'

export default async function testsSetup(): Promise<void> {
  // await assertRpcAvailable()
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
