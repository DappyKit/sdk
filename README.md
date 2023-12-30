# DappyKit SDK

DappyKit is a TypeScript library for SocialFi apps, making it easy to join EVM-based blockchains such as Ethereum and Optimism. It stands out by allowing no-gas transactions, which makes using blockchains cheaper and easier. 

DappyKit helps manage social connections and public data. With rollup gateways and ERC-4337, it's built to bring in up to 1 billion users at minimal cost.

## Installation

```shell
npm i @dappykit/sdk
```

## Testing

```shell
npm ci
npm run test
```

### Optimism Sepolia

```shell
MNEMONIC='' EXPECTED_OWNER_ADDRESS='' EXPECTED_SMART_ACCOUNT_ADDRESS='' npm test
```
`MNEMONIC` is the mnemonic phrase from an Optimism Sepolia wallet with funds.

`EXPECTED_OWNER_ADDRESS` is the expected address of the main wallet derived from `MNEMONIC`.

`EXPECTED_SMART_ACCOUNT_ADDRESS` is the expected address of the Smart Account, with `EXPECTED_OWNER_ADDRESS` as its Externally Owned Account (EOA).
