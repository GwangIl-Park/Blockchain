require('dotenv').config();
const password = process.env.PASSWORD;
const keystorePath = process.env.KEYSTORE;
const keystorePath2 = process.env.KEYSTORE2;
const provider = process.env.PROVIDER;

const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3(new Web3.providers.HttpProvider(provider));


module.exports.makeKeystore = function(privateKey)
{
    try{
        let jsonContent = JSON.stringify(web3.eth.accounts.encrypt(privateKey, password));

        let account = web3.eth.accounts.privateKeyToAccount(privateKey);

        let address = account.address;

        let fileName = `UTC--${new Date().toISOString().replace(/[:]/g, '-')}--${address}`

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

module.exports.makeTransaction = async function(func, account)
{
    try{
        let nonce = await web3.eth.getTransactionCount(account.address); //return number

        nonce = web3.utils.toHex(nonce);

        let gasPrice = await web3.eth.getGasPrice(); //return string

        gasPrice = `0x${parseInt(gasPrice).toString(16)}`;
        
        let gasLimit = await func.estimateGas({from:account.address});
        
        let data = await func.encodeABI();

        let rawTx = {
            nonce,
            gasPrice,
            gasLimit,
            data
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

module.exports.sendTransaction = async function(signedTx)
{
    try{
        web3.eth.sendSignedTransaction(signedTx);
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