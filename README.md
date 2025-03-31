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

## Scalable Offchain Processing for Social Applications

DappyKit solves one of the most significant challenges in blockchain-based social applications: handling high-volume user interactions efficiently while maintaining data integrity and ownership.

### How It Works

The SDK employs a hybrid on-chain/off-chain architecture that achieves scalability without sacrificing decentralization:

1. **Offchain Data Processing**: User actions (adding friends, updating profiles, sharing content) are processed offchain through IPFS or similar decentralized storage
2. **Content-Addressed Storage**: All changes are stored using content-addressed multihashes
3. **On-chain References**: Only the final multihash references are stored on-chain, dramatically reducing gas costs
4. **Data Verification**: Cryptographic verification ensures data integrity between offchain content and on-chain references

This architecture allows applications to process millions of user interactions offchain while anchoring only the critical reference data on the blockchain.

### Technical Implementation

The SocialConnections and FilesystemChanges contracts maintain a minimal on-chain footprint:

```javascript
// Process multiple friend requests offchain
const friendsList = await processOffchainFriendRequests(user, requests);

// Generate the content hash for the final state
const multihash = generateMultihash(friendsList);

// Store only the final reference on-chain
await sdk.connections.setUserConnection(multihash);
```

### Real-World Use Cases

#### Decentralized Social Networks

Build social networks where users maintain ownership of their social graph even if the frontend application changes:

- Users can interact with thousands of accounts without expensive on-chain transactions
- Social connections remain portable across different applications
- If an application shuts down, users retain access to their connections

#### Content Publishing Platforms

Create Medium or Substack alternatives where content ownership remains with creators:

- Authors can edit content multiple times offchain 
- Only finalized versions need blockchain transactions
- Content history is maintained through IPFS versioning
- Authors can migrate between platforms while bringing their content and audience

#### Community Management 

Build DAO or community tools with efficient member management:

- Admins can process hundreds of membership changes offchain
- Role assignments and permissions are managed efficiently
- Only periodic state updates hit the blockchain
- Permission verification remains fast and reliable

#### User-Owned Digital Identity

Create comprehensive identity systems with manageable blockchain footprint:

- Users can continuously update their profile information offchain
- Verification credentials can be issued and verified without transactions
- Identity remains portable across the entire ecosystem
- Verification status is cryptographically secure

### Benefits of this Approach

- **Cost Efficiency**: Drastically reduces the number of on-chain transactions
- **Scalability**: Handles millions of operations with minimal blockchain load
- **User Experience**: Provides Web2-like responsiveness with Web3 ownership
- **Network Efficiency**: Reduces blockchain congestion and gas costs
- **Data Ownership**: Users maintain full control of their data without managing individual transactions

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
