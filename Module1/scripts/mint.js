// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");
const nftContractJSON = require("../artifacts/contracts/HotTokenNFT.sol/HotTokenNFT.json");
const {nftAddress} = require("../nftData/contractAddress.js");
require('dotenv').config();

// const nftAddress = "0xF7c6e04392EBC6b13B31693b58f3BD99E0905439"; // place your erc721a contract address here
const nftABI = nftContractJSON.abi;
// const walletAddress = ""; // place your public address for your wallet here

async function main() {

  const nft = await hre.ethers.getContractAt(nftABI, nftAddress);

  const tx = await nft.mint(5);
  await tx.wait();

  console.log("Minted 5 NFTs");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});