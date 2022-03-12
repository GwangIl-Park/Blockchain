
const Web3 = require('web3');

const Wallet = require("ethereumjs-wallet");
const fs = require("fs");

//const keystorePath = "/home/gipark/testnet/keystore/UTC--2022-03-07T10-03-13.124634400Z--d0ca1613a59374ac4c99692c9b7235f2980f9ae4";

//const keystorePath2 = "/home/gipark/testnet/keystore/UTC--2022-03-07T10-04-01.189444200Z--37fdd8ccc6459ff6e0048f7fe0e7f5c79848efa0";

const keystorePath = "/home/gipark/Blockchain2/UTC--2022-03-08T00-47-31.834Z--05d035d402d20cb04a7bbc07aa4481d019499ec6";

//const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'));
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

let sendSignedTransaction = async function(account, password, func, to=undefined)
{
    try{
    let nonce = await web3.eth.getTransactionCount(account); //return number

    nonce = web3.utils.toHex(nonce);
    
    let gasPrice = await web3.eth.getGasPrice(); //return string

    gasPrice = `0x${parseInt(gasPrice).toString(16)}`;

    let gasLimit = await func.estimateGas({from: account});

    let data = await func.encodeABI();
    let chainId = await web3.eth.net.getId();
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
    catch(error){
        console.log(error);
    }
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

        let func = myToken.deploy(deployParameter);

        await sendSignedTransaction(account, password, func);
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

module.exports.test = async function(ca, eoa){
    try{
        connect_contract(ca);
        
        let batch = new web3.BatchRequest();
        batch.add(web3.eth.getBalance.then(console.log).request(eoa));

        batch.add(myToken.methods.balanceOf(eoa).call.request().then(console.log));

        await batch.execute();
    }
    catch(error){
        console.log(error);
    }
}