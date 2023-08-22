// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

require('dotenv').config();
const { ethers } = require("hardhat");
// const hre = require("hardhat");
// const nftContractJSON = require("../artifacts/contracts/HotTokenNFT.sol/HotTokenNFT.json");

const nftAddress = ""; // place your mumbai erc721a contract address here
// const nftABI = nftContractJSON.abi;
// const walletAddress = ""; // place your public address for your wallet here

const networkAddress = 'https://rpc-mumbai.maticvigil.com';
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(networkAddress);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {

  // const nft = await hre.ethers.getContractAt(nftABI, nftAddress);

  const nftContract = await ethers.getContractFactory("HotTokenNFT");
  const nft = nftContract.attach(nftAddress);

  // console.log("You now have: " + await nft.balanceOf(walletAddress) + " nfts");  
  console.log("You now have: " + await nft.balanceOf(wallet.address) + " nfts");  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});