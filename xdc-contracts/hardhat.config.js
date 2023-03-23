/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle");
require("hardhat-contract-sizer");
const fs = require("fs");
// const privateKey = fs.readFileSync("secret").toString();
const privateKey = fs.readFileSync(".secret").toString().trim();

const projectId = "xxx";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
    },

    xinfin: {
      url: "https://erpc.apothem.network",
      // url: "https://erpc.apothem.network",
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000,
      network_id: 51,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
    outputSelection: {
      "*": {
        "*": ["metadata", "evm.bytecode", "evm.bytecode.sourceMap"],
      },
    },
  },
};
