import { ethers } from "hardhat";

async function main() {
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const TinyVillage = await ethers.getContractFactory("TinyVillage");
  const tinyVillage = await TinyVillage.deploy();

  console.log("MyNFT Token address:", tinyVillage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });