import { ethers } from "hardhat";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";
import * as dotenv from "dotenv";
dotenv.config();

const csvPath = process.env.CSV_PATH || "./data/users.csv";
const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.RPC_URL;

if (!privateKey || !rpcUrl) {
  throw new Error("PRIVATE_KEY and RPC_URL must be set in .env");
}

async function main() {
  // Read CSV
  const csvData = readFileSync(csvPath, "utf8");
  const records = parse(csvData, { columns: true });

  // Connect wallet
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  // Deploy contract if not already deployed
  const UserToken = await ethers.getContractFactory("UserToken", wallet);
  let userTokenAddress = process.env.USER_TOKEN_ADDRESS;
  let userToken;
  if (userTokenAddress) {
    userToken = await ethers.getContractAt("UserToken", userTokenAddress, wallet);
  } else {
    userToken = await UserToken.deploy();
    await userToken.deployed();
    userTokenAddress = userToken.address;
    console.log(`UserToken deployed to: ${userTokenAddress}`);
  }

  // Mint tokens for each user
  for (const user of records) {
    // Concatenate user data for hashing
    const userString = Object.values(user).join(":");
    const userHash = ethers.keccak256(ethers.toUtf8Bytes(userString));
    const alreadyMinted = await userToken.mintedHashes(userHash);
    if (!alreadyMinted) {
      const tx = await userToken.mint(wallet.address, userHash);
      await tx.wait();
      console.log(`Minted token for user: ${userString} (hash: ${userHash})`);
    } else {
      console.log(`Token already minted for user: ${userString}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
