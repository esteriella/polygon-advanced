// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs');

async function main() {

  // const NFT = await hre.ethers.deployContract("HotTokenNFT");
  // const nftAddress = await NFT.getAddress();

  // console.log("NFT address:", await nftAddress);

  const NFT = await hre.ethers.getContractFactory("HotTokenNFT");
  const nft = await NFT.deploy();
  await nft.deployed();

  console.log("NFT address:", nft.address);

  // export the addresses
  fs.writeFileSync('nftData/contractAddress.js', `
    module.exports = {nftAddress : "${nft.address}"}
  `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
