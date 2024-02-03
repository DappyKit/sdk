const sdk = new window.DappyKit.SDK(
  window.DappyKit.Config.optimismSepoliaConfig,
  window.DappyKit.RpcHelperUtils.convertHDNodeWalletToAccountSigner(window.DappyKit.Wallet.createRandom()),
)

;(async () => {
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
})()
