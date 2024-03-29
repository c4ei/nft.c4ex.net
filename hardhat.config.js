require('@nomiclabs/hardhat-waffle')
require('dotenv').config()
const AAH_RPC_URL = process.env.AAH_RPC_URL;
const C4EI_RPC_URL = process.env.C4EI_RPC_URL;

module.exports = {
  defaultNetwork: 'c4ei',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    aah: {
      url: AAH_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
      chainId: 21133,
    },
    c4ei: {
      url: C4EI_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
      chainId: 21004,
    },
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './src/contracts',
    artifacts: './src/abis',
  },
  mocha: {
    timeout: 40000,
  },
}
