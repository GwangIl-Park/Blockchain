
const Web3 = require('web3');

const Wallet = require("ethereumjs-wallet");
const fs = require("fs");

const keystorePath = "/Users/gipark/BlockChain/Blockchain/hardhat/UTC--2022-03-02T08-27-12.374Z--ff78361785832d952916d0a8d5ff6895139aa958";

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
//const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'));
const myTokenAbi = require('../artifacts/contracts/MyToken.sol/MyToken.json').abi;
const myTokenBytecode = require('../artifacts/contracts/MyToken.sol/MyToken.json').bytecode;

const Tx = require('ethereumjs-tx').Transaction;

let myToken = undefined;

let connect_contract = function(ca=undefined){
    if(myToken == undefined)
    {
        if(ca==undefined)
        {
            myToken = new web3.eth.Contract(myTokenAbi);
        }
        else
        {
            myToken = new web3.eth.Contract(myTokenAbi,ca);
        }
    }
}

let sendSignedTransaction = async function(from, privateKey, func, to=undefined)
{
    let nonce = await web3.eth.getTransactionCount(from);

    nonce = web3.utils.toHex(nonce);

    let gasPrice = await web3.eth.getGasPrice();

    gasPrice = `0x${parseInt(gasPrice).toString(16)}`;

    let gasLimit = await func.estimateGas();

    gasLimit *= 2;
    let data = await func.encodeABI();

    let rawTx = {
        nonce,
        gasLimit,
        gasPrice,
        data
    };

    if(to!=undefined)
    {
        rawTx.to=to;
    }

    let tx = new Tx(rawTx);

    let key = Buffer.from(privateKey, 'hex');

    tx.sign(key);

    let serializedTx = tx.serialize();

    let rawData = '0x'+serializedTx.toString('hex');

    await web3.eth.sendSignedTransaction(rawData);
}

module.exports.getBalance = async function(eoa)
{
    try{
        await web3.eth.getBalance(eoa).then(console.log);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.sendTransaction = async function(from,to,value)
{
    try{
        await web3.eth.sendTransaction({from,to,value,gas:1000000}).then(console.log);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.makeKeystore = function(privateKey, password)
{
    try{
        let key = new Buffer.from(privateKey,'hex');
        let account = Wallet.fromPrivateKey(key);
        let jsonContent = JSON.stringify(account.toV3(password));

        let address = account.getAddress().toString('hex');
        let fileName = `UTC--${new Date().toISOString().replace(/[:]/g, '-')}--${address}`
        fs.writeFileSync(fileName, jsonContent);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.deploy = async function(account, password)
{
    try{
        connect_contract();

        let deployParameter = {data: myTokenBytecode, arguments: ['PGI','PGI', 18]};

        let wallet = Wallet.fromV3(fs.readFileSync(keystorePath,'utf8'),password,true);

        let nonce = await web3.eth.getTransactionCount(account);

        nonce = web3.utils.toHex(nonce);

        let gasPrice = await web3.eth.getGasPrice();

        gasPrice = `0x${parseInt(gasPrice).toString(16)}`;

        let gasLimit = await myToken.deploy(deployParameter).estimateGas({from: account});

        let data = await myToken.deploy(deployParameter).encodeABI();

        let rawTx = {
            nonce,
            gasLimit,
            gasPrice,
            data
        }

        let tx = new Tx(rawTx);

        let key = wallet.getPrivateKey();
        
        tx.sign(key);

        let serializedTx = tx.serialize();

        let rawData = '0x'+serializedTx.toString('hex');

        await web3.eth.sendSignedTransaction(rawData);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.deploy2_token = async function(ownerAddress, privateKey)
{
    try{
        connect_contract();

        let deployParameter = {data: myTokenBytecode, arguments: ['PGI','PGI', 18]};

        let func = myToken.deploy(deployParameter);

        await sendSignedTransaction(ownerAddress,privateKey,func);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.totalSupply = async function(ca)
{
    try{
        connect_contract(ca);
        await myToken.methods.totalSupply().call().then(console.log);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.balanceOf = async function(ca,eoa)
{
    try{
        connect_contract(ca);
        await myToken.methods.balanceOf(eoa).call().then(console.log);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.transfer = async function(ca, eoa, privateKey, to, amount)
{
    try{
        connect_contract(ca);

        let func = myToken.methods.transfer(to,amount);

        await sendSignedTransaction(eoa,privateKey,func,ca);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.allowance = async function(ca, owner, spender){
    try{
        connect_contract(ca);
        await myToken.methods.allowance(owner,spender).call().then(console.log);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.approve = async function(ca, eoa, privateKey, spender, amount){
    try{
        connect_contract(ca);
        
        let func = myToken.methods.approve(spender, amount);
        await sendSignedTransaction(eoa, privateKey, func, ca);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.transferFrom = async function(ca, eoa, privateKey, from, to, amount){
    try{
        connect_contract(ca);
        
        let func = myToken.methods.transferFrom(from, to, amount);
        await sendSignedTransaction(eoa, privateKey, func, ca);
    }
    catch(error){
        console.log(error);
    }
}