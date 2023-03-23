const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  let txHash, txReceipt;

  //XSWAP contract deployement
  const XSWAP = await hre.ethers.getContractFactory("XSWAP");
  const xswap = await XSWAP.deploy();
  await xswap.deployed();
  txHash = xswap.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let xswapAddress = txReceipt.contractAddress;
  console.log("XSWAP Contract Address", xswapAddress);

  const XLENDING = await hre.ethers.getContractFactory("XLending");
  const xlending = await XLENDING.deploy();
  await xlending.deployed();
  txHash = xlending.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let xlendingAddress = txReceipt.contractAddress;
  console.log("XLENDING Contract Address", xlendingAddress);

  const XDCPay = await hre.ethers.getContractFactory("XDCPay");
  const xDCPay = await XDCPay.deploy(xswapAddress);

  await xDCPay.deployed();

  txHash = xDCPay.deployTransaction.hash;
  txReceipt = await ethers.provider.waitForTransaction(txHash);
  let XDCPayAddress = txReceipt.contractAddress;

  console.log("XDC Contract Address", XDCPayAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
