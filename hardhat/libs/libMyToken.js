const libWeb3 = require("./libWeb3.js");
const makeKeystore = libWeb3.makeKeystore;
const decodeKeystore = libWeb3.decodeKeystore;
const connect_contract = libWeb3.connect_contract;
const makeTransaction = libWeb3.makeTransaction;
const signTransaction = libWeb3.signTransaction;
const sendTransaction = libWeb3.sendTransaction;

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

        await sendTransaction(rlp.rawTransaction);
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

module.exports.transfer = async function(ca, eoa, to, amount)
{
    try{
        connect_contract(ca);

        let func = myToken.methods.transfer(to,amount);

        await sendSignedTransaction(eoa,func,ca);
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

module.exports.test = function(from,to,from2,to2,value){
    try{
//        await web3.eth.sendTransaction({from,to,value}).then(console.log);
        
        let batch = new web3.BatchRequest();
        batch.add(web3.eth.getBalance.request(from,(error,res)=>{
            if(error) throw error;
            console.log(res);
        }));
/*
        batch.add(web3.eth.sendTransaction.request({from:from2,to:to2,value},(error,res)=>{
            if(error) throw error;
            console.log(res);
        }));*/
console.log(batch);
        batch.execute();
    }
    catch(error){
        console.log(error);
    }
}