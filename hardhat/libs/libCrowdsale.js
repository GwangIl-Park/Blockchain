
const Web3 = require('web3');

const Wallet = require("ethereumjs-wallet");
const fs = require("fs");
const Tx = require('ethereumjs-tx').Transaction;

//const keystorePath = "/home/gipark/testnet/keystore/UTC--2022-03-07T10-03-13.124634400Z--d0ca1613a59374ac4c99692c9b7235f2980f9ae4";

//const keystorePath2 = "/home/gipark/testnet/keystore/UTC--2022-03-07T10-04-01.189444200Z--37fdd8ccc6459ff6e0048f7fe0e7f5c79848efa0";

const keystorePath = "/home/gipark/Blockchain2/UTC--2022-03-08T00-47-31.834Z--05d035d402d20cb04a7bbc07aa4481d019499ec6";

//const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'));
const crowdsaleAbi = require('../artifacts/contracts/CrowdSale.sol/CrowdSale.json').abi;
const crowdsaleBytecode = require('../artifacts/contracts/CrowdSale.sol/CrowdSale.json').bytecode;

let crowdsale = undefined;

let connect_contract = function(ca=undefined){
    if(crowdsale == undefined)
    {
        if(ca==undefined)
        {
            crowdsale = new web3.eth.Contract(crowdsaleAbi);
        }
        else
        {
            crowdsale = new web3.eth.Contract(crowdsaleAbi,ca);
        }
    }
}

let sendSignedTransaction = async function(account, password, func, to=undefined)
{
    let nonce = await web3.eth.getTransactionCount(account);

    nonce = web3.utils.toHex(nonce);

    let gasPrice = await web3.eth.getGasPrice();

    gasPrice = `0x${parseInt(gasPrice).toString(16)}`;

    let gasLimit = await func.estimateGas({from: account});

    let data = await func.encodeABI();

    let rawTx = {
        nonce,
        gasLimit,
        gasPrice,
        data
    }

    if(to!=undefined)
    {
        rawTx.to=to;
    }

    let tx = new Tx(rawTx,{chain:'ropsten'});

    let wallet = Wallet.fromV3(fs.readFileSync(keystorePath,'utf8'),password,true);

    let key = wallet.getPrivateKey();
    
    tx.sign(key);

    let serializedTx = tx.serialize();

    let rawData = '0x'+serializedTx.toString('hex');

    await web3.eth.sendSignedTransaction(rawData);
}

let sendSignedTransaction_key = async function(from, privateKey, func, to=undefined)
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

module.exports.deployCrowdsale = async function(account, password, token, price, goal)
{
    try{
        connect_contract();

        let deployParameter = {data: crowdsaleBytecode, arguments: [token,price,goal]};

        let func = crowdsale.deploy(deployParameter);

        await sendSignedTransaction(ownerAddress,privateKey,func);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.checkGoal = async function(ca, ownerAddress, privateKey)
{
    try{
        connect_contract(ca);
        let func = crowdsale.methods.checkGoal();
        await sendSignedTransaction(ownerAddress, privateKey, func,ca);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.getFailEther = async function(ca, ownerAddress, privateKey)
{
    try{
        connect_contract(ca);
        let func = crowdsale.methods.getFailEther();
        await sendSignedTransaction(ownerAddress, privateKey, func,ca);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.getGoal = async function(ca)
{
    try{
        connect_contract(ca);
        await crowdsale.methods.getGoal().call().then(console.log);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.getFund = async function(ca)
{
    try{
        connect_contract(ca);
        await crowdsale.methods.getFund().call().then(console.log);
    }
    catch(error){
        console.log(error);
    }
}