# DappyKit SDK

## Overview

DappyKit is a TypeScript library that simplifies building mini applications on Superchain networks. It enables gasless transactions, making blockchain interactions more accessible and affordable for users.

## Features

- **Gasless Transactions** - Users can interact with blockchain without paying gas fees
- **Social Connections** - Easily manage user relationships and connections
- **Decentralized Data** - Store and manage public data securely
- **Multi-chain Support** - Built for Superchain networks including Optimism and others
- **Developer Friendly** - Simple API designed for both Web2 and Web3 developers

## Installation

```shell
npm i @dappykit/sdk
```

## Testing

### Install SDK dependencies and run tests

```shell
npm ci
npm run test
```

### Run tests in Optimism Sepolia

```shell
MNEMONIC='YOUR_MNEMONIC' EXPECTED_OWNER_ADDRESS='YOUR_OWNER_ADDRESS' EXPECTED_SMART_ACCOUNT_ADDRESS='YOUR_ACCOUNT_ADDRESS' npm test
```

- `MNEMONIC` is the mnemonic phrase from an Optimism Sepolia wallet with funds
- `EXPECTED_OWNER_ADDRESS` is the expected address of the main wallet derived from `MNEMONIC`
- `EXPECTED_SMART_ACCOUNT_ADDRESS` is the expected address of the Smart Account, with `EXPECTED_OWNER_ADDRESS` as its Externally Owned Account (EOA)
