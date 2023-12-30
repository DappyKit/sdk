const sdk = new window.DappyKit.SDK(
  window.DappyKit.Config.optimismSepoliaConfig,
  window.DappyKit.RpcHelperUtils.convertHDNodeWalletToAccountSigner(window.DappyKit.Wallet.createRandom()),
)

;(async () => {
  // eslint-disable-next-line no-console
  console.log(await sdk.connections.getUserConnectionMultihash('0x14d435d97ccf8Fc8da9B9364bFD5E91729502a0b'))
})()
