import { ethers } from "hardhat";
import { expect } from "chai";

describe("UserToken", function () {
  let userToken: any;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const UserToken = await ethers.getContractFactory("UserToken");
    userToken = await UserToken.deploy();
    await userToken.deployed();
  });

  it("should mint a token for a unique user hash", async function () {
    const userHash = ethers.keccak256(ethers.toUtf8Bytes("1:Alice:alice@example.com"));
    await userToken.mint(owner.address, userHash);
    expect(await userToken.mintedHashes(userHash)).to.be.true;
    expect(await userToken.ownerOf(0)).to.equal(owner.address);
  });

  it("should not mint a token for the same user hash twice", async function () {
    const userHash = ethers.keccak256(ethers.toUtf8Bytes("2:Bob:bob@example.com"));
    await userToken.mint(owner.address, userHash);
    await expect(userToken.mint(owner.address, userHash)).to.be.revertedWith("Token already minted for this user");
  });

  it("should increment tokenId for each mint", async function () {
    const hash1 = ethers.keccak256(ethers.toUtf8Bytes("1:Alice:alice@example.com"));
    const hash2 = ethers.keccak256(ethers.toUtf8Bytes("2:Bob:bob@example.com"));
    await userToken.mint(owner.address, hash1);
    await userToken.mint(owner.address, hash2);
    expect(await userToken.ownerOf(0)).to.equal(owner.address);
    expect(await userToken.ownerOf(1)).to.equal(owner.address);
  });
});
