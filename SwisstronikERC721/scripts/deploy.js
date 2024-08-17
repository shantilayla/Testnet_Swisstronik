const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("SwisstronikNFT");

  await contract.waitForDeployment();

  console.log(`SwisstronikNFT contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
