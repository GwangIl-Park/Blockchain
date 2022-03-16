const libWeb3 = require("./libWeb3.js");
const decodeKeystore = libWeb3.decodeKeystore;
const connect_contract = libWeb3.connect_contract;
const makeTransaction = libWeb3.makeTransaction;
const signTransaction = libWeb3.signTransaction;
const sendTransaction = libWeb3.sendTransaction;
const createBatch = libWeb3.createBatch;
const get_sendTransaction_request = libWeb3.get_sendTransaction_request;

const myTokenAbi = require('../artifacts/contracts/MyToken.sol/MyToken.json').abi;
const myTokenBytecode = require('../artifacts/contracts/MyToken.sol/MyToken.json').bytecode;

let myToken = undefined;

module.exports.deploy_token = async function(name, symbol, decimal)
{
    try{
        myToken = connect_contract(myTokenAbi);

        let account = await decodeKeystore();
        if(account == null)
        {
            throw new Error("decodeKeystore Fail");
        }

        let deployParameter = {data:myTokenBytecode, arguments:[name, symbol, decimal]};

        let func = myToken.deploy(deployParameter);

        let rawTx = await makeTransaction(func, account);

        let rlp = await signTransaction(rawTx, account);

        sendTransaction(rlp.rawTransaction,true);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.totalSupply = async function(ca)
{
    try{
        myToken = connect_contract(myTokenAbi,ca);
        return myToken.methods.totalSupply().call();
    }
    catch(error){
        console.log(error);
    }
}

module.exports.balanceOf = async function(ca,eoa)
{
    try{
        myToken = connect_contract(myTokenAbi,ca);
        return myToken.methods.balanceOf(eoa).call();
    }
    catch(error){
        console.log(error);
    }
}

module.exports.transfer = async function(ca, to, amount)
{
    try{
        myToken = connect_contract(myTokenAbi,ca);

        let account = await decodeKeystore();
        if(account == null)
        {
            throw new Error("decodeKeystore Fail");
        }

        let func = myToken.methods.transfer(to,amount);

        let rawTx = await makeTransaction(func, account,ca);

        let rlp = await signTransaction(rawTx, account);

        sendTransaction(rlp.rawTransaction);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.transfer_n = async function(ca, to, amount, count)
{
    try{
        myToken = connect_contract(myTokenAbi,ca);

        let account = await decodeKeystore();
        if(account == null)
        {
            throw new Error("decodeKeystore Fail");
        }

        let func = myToken.methods.transfer(to,amount);

        let rawTx = await makeTransaction(func, account,ca);
        let nonce = rawTx.nonce;
        let batch = createBatch();

        for(let i=0;i<count;i++)
        {
            rawTx.nonce = nonce+i;
            let rlp = await signTransaction(rawTx,account);
            batch.add(await get_sendTransaction_request(rlp.rawTransaction));
        }
        batch.execute();
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

module.exports.approve = async function(ca, eoa, spender, amount){
    try{
        connect_contract(ca);
        
        let func = myToken.methods.approve(spender, amount);
        await sendSignedTransaction(eoa, func, ca);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.transferFrom = async function(ca, eoa, from, to, amount){
    try{
        connect_contract(ca);
        
        let func = myToken.methods.transferFrom(from, to, amount);
        await sendSignedTransaction(eoa, func, ca);
    }
    catch(error){
        console.log(error);
    }
}

module.exports.test = async function()
{
    let account = await decodeKeystore();
    if(account == null)
    {
        throw new Error("decodeKeystore Fail");
    }
    const messageHash = web3.sha3('Apples');
    const signature = await web3.eth.personal.sign(messageHash, account.address);
}