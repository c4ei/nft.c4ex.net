require("@nomicfoundation/hardhat-toolbox");

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC =
  "https://polygon-mumbai.g.alchemy.com/v2/0awa485pp03Dww2fTjrSCg7yHlZECw-K";
const NEXT_PUBLIC_PRIVATE_KEY = "";
/** @type import('hardhat/config').HardhatUserConfig */
const AAH_RPC_URL = "https://rpc.c4ex.net";
const C4EI_RPC_URL = "https://rpc.c4ei.net";

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "aah",
  networks: {
    // hardhat: {},
    // polygon_mumbai: {
    //   url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
    //   accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    // },
    aah: {
      url: AAH_RPC_URL,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
      chainId: 21133,
    },
    c4ei: {
      url: C4EI_RPC_URL,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
      chainId: 21004,
    },
  },
};
