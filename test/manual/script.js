const sdk = new window.DappyKit.SDK(
  window.DappyKit.Config.optimismSepoliaConfig,
  window.DappyKit.RpcHelperUtils.convertHDNodeWalletToAccountSigner(window.DappyKit.Wallet.createRandom()),
)

;(async () => {
  const verificationContractAddress = '0x721462E34DCC00F8Bd0f0cD07762cfd482a0Fcb4'

  // eslint-disable-next-line no-console
  console.log('Smart Account address', await sdk.account.getAddress())

  // eslint-disable-next-line no-console
  console.log(
    'user connection multihash',
    await sdk.connections.getUserConnectionMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )

  // eslint-disable-next-line no-console
  console.log(
    'service connection multihash',
    await sdk.connections.getServiceConnectionMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )

  // eslint-disable-next-line no-console
  console.log(
    'user filesystem multihash',
    await sdk.filesystemChanges.getUserChangeMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )

  // eslint-disable-next-line no-console
  console.log(
    'service filesystem multihash',
    await sdk.filesystemChanges.getServiceChangeMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )

  // eslint-disable-next-line no-console
  console.log(
    'verification check (expect true)',
    await sdk.verification.getIsVerified('0x293AC5D2C7df3e9742d8e562d7cEE8Ba6ce43D81', verificationContractAddress),
  )

  // eslint-disable-next-line no-console
  console.log(
    'verification check (expect false)',
    await sdk.verification.getIsVerified('0x3a6019cc36FB715Bd7aE6f83BEA98Bbe77E06f50', verificationContractAddress),
  )

  // eslint-disable-next-line no-console
  console.log(
    'verification check (expect 68579410290623560541334757137125908201458771167157024679308233665838308954395)',
    await sdk.verification.getTokenId('0x293AC5D2C7df3e9742d8e562d7cEE8Ba6ce43D81', verificationContractAddress),
  )
})()
