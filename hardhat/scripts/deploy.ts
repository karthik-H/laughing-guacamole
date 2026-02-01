import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const UserToken = await ethers.getContractFactory("UserToken");
  const userToken = await UserToken.deploy();
  await userToken.deployed();
  console.log(`UserToken deployed to: ${userToken.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
