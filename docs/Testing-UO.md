# Testing with User Operations

### Install contracts project

```shell
# Clone the project
git clone git@github.com:DappyKit/contracts.git

# Install dependencies
npm ci

# Code the env and fill it
cp example.env .env

# Start Hardhat node
npx hardhat node

# Deploy contracts to the node
npx hardhat run scripts/deploy-dappy.ts --network localhost

# !!! Copy contract addresses from ./DappyKit/contracts/deployed-contracts.json to ./DappyKit/sdk/.env
```

### Start the bundler

Install EthInfinitism bundler as a separate project.

```shell
git clone git@github.com:eth-infinitism/bundler.git
cd bundler
git checkout 3fcc4eff5d9c3ccbf9863fa298e6d565801446cf
yarn && yarn preprocess
yarn hardhat-deploy --network localhost
yarn run bundler --unsafe
```

### Test Runop

```shell
yarn run runop --deployFactory --network http://localhost:8545/ --entryPoint 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
```
