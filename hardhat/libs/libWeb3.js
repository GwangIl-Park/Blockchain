
const Web3 = require('web3');

const Wallet = require("ethereumjs-wallet");
const fs = require("fs");

const keystorePath = "/Users/gipark/BlockChain/Blockchain/hardhat/UTC--2022-03-02T08-27-12.374Z--ff78361785832d952916d0a8d5ff6895139aa958";

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'));