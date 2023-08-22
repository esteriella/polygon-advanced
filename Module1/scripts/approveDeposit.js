// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// const hre = require("hardhat");
const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../FXRootContractAbi.js");
// const nftContractJSON = require("../artifacts/contracts/HotTokenNFT.sol/HotTokenNFT.json");
require('dotenv').config();
const {nftAddress} = require("../nftData/contractAddress.js");
// const nftAddress = "0xF7c6e04392EBC6b13B31693b58f3BD99E0905439"; // place your erc721a contract address here
// const nftABI = nftContractJSON.abi;
const fxRootAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de';
// const walletAddress = "0x5e8331Cd76454B9A558CaF9c50f428d78DEb8647"; // place your public address for your wallet here

const networkAddress = 'https://ethereum-goerli.publicnode.com';
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(networkAddress);
const wallet = new ethers.Wallet(privateKey, provider);

async function main() {

  // const nftContract = await hre.ethers.getContractAt(nftABI, nftAddress);
  const nftContract = await ethers.getContractFactory("HotTokenNFT");
  const nft = nftContract.attach(nftAddress);
  const fxContract = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  // Get the signer instance
  const [signer] = await ethers.getSigners();

  // const approveTx = await nftContract.approve(fxRootAddress, 5);
  const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();

  console.log('Approval confirmed');

  const nftIds = [0, 1, 2, 3, 4];

  // const depositTx = await fxContract.deposit(nftAddress, walletAddress, 5, "0x6556");
  for (let i = 0; i < nftIds; i++) {
    const depositTx = await fxContract.connect(signer).deposit(
      nft.address,
      wallet.address,
      nftIds[i],
      '0x6566'
    );

    await depositTx.wait();
  }

  console.log("NFTs deposited");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});