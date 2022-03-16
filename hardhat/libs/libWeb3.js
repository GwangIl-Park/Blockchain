require('dotenv').config();
const password = process.env.PASSWORD;
const keystorePath = process.env.KEYSTORE;
const keystorePath2 = process.env.KEYSTORE2;
const provider = process.env.PROVIDER;

const libWinston = require("./libWinston.js");
const Log = libWinston.Log;

const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3(new Web3.providers.HttpProvider(provider));


module.exports.makeKeystore = function(privateKey)
{
    try{
        let jsonContent = JSON.stringify(web3.eth.accounts.encrypt(privateKey, password));

        let account = web3.eth.accounts.privateKeyToAccount(privateKey);

        let fileName = `keystore/UTC--${new Date().toISOString().replace(/[:]/g, '-')}--${account.address}`

        fs.writeFileSync(fileName, jsonContent);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.decodeKeystore = async function()
{
    try{
        let keystore = JSON.parse(fs.readFileSync(keystorePath,'utf-8'));
        if(keystore == null){
            throw new Error("keystore file not exist");
        }
        return web3.eth.accounts.decrypt(keystore,password);
    }
    catch(error){
        console.log(error);
        return null;
    }
}

module.exports.connect_contract = function(contract_abi, ca=undefined)
{
    if(ca==undefined)
    {
        return new web3.eth.Contract(contract_abi);
    }
    else
    {
        return new web3.eth.Contract(contract_abi,ca);
    }
}

module.exports.makeTransaction = async function(func, account,to=undefined)
{
    try{
        let nonce = await web3.eth.getTransactionCount(account.address); //return number

        let gasPrice = await web3.eth.getGasPrice(); //return string

        gasPrice = `0x${parseInt(gasPrice).toString(16)}`;
        
        let gasLimit = await func.estimateGas({from:account.address});

        gasLimit+=100;
        
        let data = await func.encodeABI();

        let rawTx = {
            nonce,
            gasPrice,
            gasLimit,
            data
        }
        if(to!=undefined)
        {
            rawTx.to = to;
        }
        
        return rawTx;
    }
    catch(error){
        console.log(error);
    }
}

module.exports.signTransaction = async function(rawTx, account)
{
    try{
        return web3.eth.accounts.signTransaction(rawTx,account.privateKey);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.sendTransaction = async function(signedTx, bsync)
{
    try{
        if(bsync)
        {
            await web3.eth.sendSignedTransaction(signedTx)
            .on("transactionHash",async function(hash){
                Log(hash);
            })
            .on("receipt",async function(receipt){
                Log(receipt);
            });
        }
        else
        {
            web3.eth.sendSignedTransaction(signedTx)
            .on("transactionHash",async function(hash){
                Log(hash);
            })
            .on("receipt",async function(receipt){
                Log(receipt);
            });
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports.createBatch = function()
{
    return new web3.BatchRequest();
}

module.exports.get_sendTransaction_request = async function(signedTx)
{
    return web3.eth.sendSignedTransaction.request(signedTx,function(error,hash){
        if(error)
        {
            Log(error);
        }
        else
        {
            Log(hash);
        }
    })
}