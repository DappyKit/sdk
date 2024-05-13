const { generateMnemonic, english } = window.DappyKit.ViemUtils
const mnemonic = generateMnemonic(english)
const optimismMainnetConfig = window.DappyKit.Config.optimismMainnetConfig
const optimismSepoliaConfig = window.DappyKit.Config.optimismSepoliaConfig

// example how to create SDK instance with mnemonic
const sdkTestnet = new window.DappyKit.SDK(optimismSepoliaConfig, mnemonic)

// example how to create SDK instance with mnemonic
const sdkMainnet = new window.DappyKit.SDK(optimismMainnetConfig, mnemonic)

async function defaultScenario() {
  const verificationContractAddress = '0x721462E34DCC00F8Bd0f0cD07762cfd482a0Fcb4'

  // eslint-disable-next-line no-console
  console.log('Smart Account address', await sdkTestnet.account.getAddress())

  // eslint-disable-next-line no-console
  console.log(
    'user connection multihash',
    await sdkTestnet.connections.getUserConnectionMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )

  // eslint-disable-next-line no-console
  console.log(
    'service connection multihash',
    await sdkTestnet.connections.getServiceConnectionMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )

  // eslint-disable-next-line no-console
  console.log(
    'user filesystem multihash',
    await sdkTestnet.filesystemChanges.getUserChangeMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )

  // eslint-disable-next-line no-console
  console.log(
    'service filesystem multihash',
    await sdkTestnet.filesystemChanges.getServiceChangeMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )

  // eslint-disable-next-line no-console
  console.log(
    'verification check (expect true)',
    await sdkTestnet.verification.getIsVerified(
      '0x293AC5D2C7df3e9742d8e562d7cEE8Ba6ce43D81',
      verificationContractAddress,
    ),
  )

  // eslint-disable-next-line no-console
  console.log(
    'verification check (expect false)',
    await sdkTestnet.verification.getIsVerified(
      '0x3a6019cc36FB715Bd7aE6f83BEA98Bbe77E06f50',
      verificationContractAddress,
    ),
  )

  // eslint-disable-next-line no-console
  console.log(
    'verification check (expect 68579410290623560541334757137125908201458771167157024679308233665838308954395)',
    await sdkTestnet.verification.getTokenId('0x293AC5D2C7df3e9742d8e562d7cEE8Ba6ce43D81', verificationContractAddress),
  )

  /**
   * {
   *       smartAccountAddress: '0x4FFC738603dDAa0E1CeDe748166E5f7b73DDa7Dc',
   *       optimismMainnet: { isDeployed: true, verifiedBy: ['farcaster'] },
   *     }
   */
  // eslint-disable-next-line no-console
  console.log(
    'getSmartAccountInfo via gateway',
    await sdkMainnet.gateway.verification.getSmartAccountInfo('0xDb0c6C27C2C1ea4193d808bAB25be0Fc27fa4867'),
  )
}
