const hre = require("hardhat");

const { encryptDataField } = require("@swisstronik/utils");  

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;

  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x800349F1D63f4dD47B2AC73c2EF78CdfEb60EA0B"; 

  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("Swisstronik"); 
  const contract = contractFactory.attach(contractAddress);

  const functionName = "mint";
  const mintTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName),
    0
  );

  await mintTx.wait();

  console.log("Mint transaction receipt: ", mintTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});