# DappyKit SDK

[![npm version](https://img.shields.io/npm/v/@dappykit/sdk.svg)](https://www.npmjs.com/package/@dappykit/sdk)
[![Downloads](https://img.shields.io/npm/dm/@dappykit/sdk.svg)](https://www.npmjs.com/package/@dappykit/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

DappyKit is a TypeScript SDK for building web3 social applications on Superchain networks. With over 30,000 active users and 200+ projects using our platform, DappyKit provides developers with tools to create blockchain experiences without typical friction points.

## Key Benefits

- **Gasless Transactions** - Remove barriers to web3 adoption with transactions that don't require gas fees
- **Multi-Chain Support** - Build once, deploy across the entire Superchain ecosystem
- **Smart Account Integration** - Implement ERC-4337 compliant smart accounts efficiently
- **User Data Ownership** - Enable users to control their data and social connections
- **Web2 Developer Experience** - Utilize familiar development patterns for web3 applications

## Core Features

### Account Abstraction (ERC-4337)

Create and manage smart accounts with simplified transaction handling:

```javascript
// Create an SDK instance with a network configuration
const sdk = new DappyKit.SDK(optimismMainnetConfig, mnemonic);

// Get the smart account address
const accountAddress = await sdk.account.getAddress();
```

### Social Connections Management

Store and retrieve user social connections on-chain with persistent data ownership:

```javascript
// Set user connections
await sdk.connections.setUserConnection(multihash);

// Get user connections for any address
const connections = await sdk.connections.getUserConnectionMultihash(address);
```

### Decentralized File Management

Manage user file data with built-in IPFS integration and on-chain references:

```javascript
// Store file system changes for a user
await sdk.filesystemChanges.setUserChange(multihash);

// Retrieve file system data
const userData = await sdk.filesystemChanges.getUserChangeMultihash(address);
```

### Identity Verification

Verify user identities through multiple providers (Google, Twitter, Farcaster) with Soulbound Token support:

```javascript
// Check if an address is verified
const isVerified = await sdk.verification.getIsVerified(address, verificationContractAddress);

// Verify through Farcaster
const verificationResult = await sdk.gateway.verification.verifyFarcaster(clickData);
```

### Gasless Transactions

Enable users to interact with the blockchain without paying gas fees:

```javascript
// All transactions from the SDK handle gas fees automatically
// No additional code required!
```

## Current Usage

DappyKit is used by blockchain projects across the Superchain ecosystem:

- Powers 200+ applications across multiple chains
- Integrates with major protocols in the Optimism ecosystem

## Installation

```shell
npm i @dappykit/sdk
```

## Quick Start

```javascript
// Import and initialize the SDK
import { SDK, Config } from '@dappykit/sdk';

// Create an SDK instance with a network configuration
const sdk = new SDK(Config.optimismMainnetConfig);

// Create a new user account
const address = await sdk.account.getAddress();

// Store some user connection data
await sdk.connections.setUserConnection({ 
  hash: '0x123...', 
  hashFunction: 1, 
  size: 32 
});

// Verify user identity
const isVerified = await sdk.verification.getIsVerified(address);
```

## Supported Networks

- Optimism Mainnet
- Base
- Mode
- Fraxtal
- All Superchain Compatible Networks

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

## Community and Support

- [Farcaster](https://warpcast.com/DappyKit) - Follow us on Farcaster
- [Documentation](https://docs.dappykit.org) - Comprehensive guides and API references
- [GitHub Issues](https://github.com/DappyKit/sdk/issues) - Report bugs or request features

## License

MIT © DappyKit
