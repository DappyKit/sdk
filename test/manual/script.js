const sdk = new window.DappyKit.SDK(
  window.DappyKit.Config.optimismSepoliaConfig,
  window.DappyKit.RpcHelperUtils.convertHDNodeWalletToAccountSigner(window.DappyKit.Wallet.createRandom()),
)

;(async () => {
  // eslint-disable-next-line no-console
  console.log(
    'connection multihash',
    await sdk.connections.getUserConnectionMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )
  // eslint-disable-next-line no-console
  console.log(
    'filesystem multihash',
    await sdk.filesystemChanges.getUserChangeMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'),
  )
})()
