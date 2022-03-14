//exe: node exams.js [getBalance] [addr]
//exe: node exams.js [sendTx] [from addr] [to addr] [amount] 

const libMyToken = require("../libs/libMyToken.js");
const libCrowdsale = require("../libs/libCrowdsale.js");

const test = libMyToken.test;
const getBalance = libMyToken.getBalance;
const sendTransaction = libMyToken.sendTransaction;
const makeKeystore = libMyToken.makeKeystore;
const deploy_token = libMyToken.deploy_token;
const deploy_key_token = libMyToken.deploy_key_token;
const totalSupply = libMyToken.totalSupply;
const balanceOf = libMyToken.balanceOf;
const transfer = libMyToken.transfer;
const allowance = libMyToken.allowance;
const approve = libMyToken.approve;
const transferFrom = libMyToken.transferFrom;
const deployCrowdsale = libCrowdsale.deployCrowdsale;
const checkGoal = libCrowdsale.checkGoal;
const getFailEther = libCrowdsale.getFailEther;
const getGoal = libCrowdsale.getGoal;
const getFund = libCrowdsale.getFund;

let proc_test = function(){
    try{
        if(process.argv.length != 8)
        {
            throw new Error("Usage : node exams/exams.js test [from] [to] [from2] [to2] [value]");
        }
        test(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
    }
    catch(error){
        console.log(error);
    }
}

let proc_getBalance = async function(){
    try{
        if(process.argv.length != 4)
        {
            throw new Error("Usage : node exams/exams.js getBalance [address]");
        }
        await getBalance(arguments[0]);
    }
    catch(error){
        console.log(error);
    }
}

let proc_sendTransaction = async function(){
    try{
        if(process.argv.length != 6)
        {
            throw new Error("Usage : node exams/exams.js sendTransaction [from] [to] [amount]");
        }
        await sendTransaction(arguments[0],arguments[1],arguments[2]);
    }
    catch(error){
        console.log(error);
    }
}

let proc_makeKeystore = function(){
    try{
        if(process.argv.length != 4)
        {
            throw new Error("Usage : node exams/exams.js makeKeystore [privateKey]");
        }
        makeKeystore(arguments[0]);
    }
    catch(error){
        console.log(error);
    }
}

let proc_deploy_token = async function(){
    try{
        if(process.argv.length != 6)
        {
            throw new Error("Usage : node exams/exams.js deploy_token [name] [symbol] [decimal]");
        }
        await deploy_token(arguments[0],arguments[1],arguments[2]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_deploy_key_token = async function(){
    try{
        if(process.argv.length != 8)
        {
            throw new Error("Usage : node exams/exams.js deploy_key_token [account] [privateKey] [name] [symbol] [decimal]");
        }
        await deploy_key_token(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_totalSupply = async function(){
    try{
        if(process.argv.length!=4)
        {
            throw new Error("Usage : node exams/exams.js totalSupply [ca]");
        }
        await totalSupply(arguments[0]);
    }
    catch(error){
        console.log(error);
    }
}

let proc_balanceOf = async function(){
    try{
        if(process.argv.length != 5)
        {
            throw new Error("Usage : node exams/exams.js balanceOf [ca] [eoa]");
        }
        await balanceOf(arguments[0],arguments[1]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_transfer = async function(){
    try{
        if(process.argv.length != 7)
        {
            throw new Error("Usage : node exams/exams.js transfer [ca] [from] [to] [amount]");
        }
        await transfer(arguments[0],arguments[1],arguments[2],arguments[3]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_allowance = async function(){
    try{
        if(process.argv.length != 5)
        {
            throw new Error("Usage : node exams/exams.js allowance [ca] [eoa]");
        }
        await allowance(arguments[0],arguments[1],arguments[2]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_approve = async function(){
    try{
        if(process.argv.length != 8)
        {
            throw new Error("Usage : node exams/exams.js approve [ca] [eoa] [from] [to] [amount]");
        }
        await approve(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_transferFrom = async function(){
    try{
        if(process.argv.length != 8)
        {
            throw new Error("Usage : node exams/exams.js transferFrom [ca] [eoa] [from] [to] [amount]");
        }
        await transferFrom(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_deployCrowdsale = async function(){
    try{
        if(process.argv.length != 7)
        {
            throw new Error("Usage : node exams/exams.js deployCrowdsale [eoa] [token] [price] [goal]");
        }
        await deployCrowdsale(arguments[0],arguments[1],arguments[2],arguments[3]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_checkGoal = async function(){
    try{
        if(process.argv.length != 5)
        {
            throw new Error("Usage : node exams/exams.js checkGoal [ca] [eoa]");
        }
        await checkGoal(arguments[0],arguments[1]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_getFailEther = async function(){
    try{
        if(process.argv.length != 5)
        {
            throw new Error("Usage : node exams/exams.js getFailEther [ca] [eoa]");
        }
        await getFailEther(arguments[0],arguments[1]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_getGoal = async function(){
    try{
        if(process.argv.length != 4)
        {
            throw new Error("Usage : node exams/exams.js getGoal [ca]");
        }
        await getGoal(arguments[0]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_getFund = async function(){
    try{
        if(process.argv.length != 4)
        {
            throw new Error("Usage : node exams/exams.js getFund [ca]");
        }
        await getFund(arguments[0]);
    }
    catch (error){
        console.log(error);
    }
}

let RunProc = async function() {
    try {
        if(process.argv.length < 1) {
            throw new Error("Invalid Parameters!");
        }
        category = process.argv[2];
        console.log(category);
        switch(category) {
            case "getBalance":{await proc_getBalance(process.argv[3]);break;}
            case "sendTransaction":{await proc_sendTransaction(process.argv[3],process.argv[4],process.argv[5]);break;}

            case "makeKeystore":{proc_makeKeystore(process.argv[3]);break;}
            case "deploy_token":{await proc_deploy_token(process.argv[3],process.argv[4],process.argv[5]);break;}   //key from keystore file
            case "deploy_key_token":{await proc_deploy_key_token(process.argv[3],process.argv[4],process.argv[5],process.argv[6],process.argv[7]);break;}  //for ganache test (input key)
            case "totalSupply":{await proc_totalSupply(process.argv[3]);break;}
            case "balanceOf":{await proc_balanceOf(process.argv[3], process.argv[4]);break;}
            case "transfer":{await proc_transfer(process.argv[3], process.argv[4],process.argv[5],process.argv[6]);break;}
            case "allowance":{await proc_allowance(process.argv[3], process.argv[4],process.argv[5]);break;}
            case "approve":{await proc_approve(process.argv[3], process.argv[4],process.argv[5],process.argv[6],process.argv[7]);break;}
            case "transferFrom":{await proc_transferFrom(process.argv[3], process.argv[4],process.argv[5],process.argv[6],process.argv[7]);break;}

            case "deployCrowdsale":{await proc_deployCrowdsale(process.argv[3], process.argv[4],process.argv[5],process.argv[6]);break;}
            case "checkGoal":{await proc_checkGoal(process.argv[3], process.argv[4]);break;}
            case "getFailEther":{await proc_getFailEther(process.argv[3], process.argv[4]);break;}
            case "getGoal":{await proc_getGoal(process.argv[3]);break;}
            case "getFund":{await proc_getFund(process.argv[3]);break;}
            case "test":{proc_test(process.argv[3], process.argv[4],process.argv[5],process.argv[6],process.argv[7]);break;}
            case "test2":{proc_test2();break;}
            default: {throw new Error("Invalid category!");}
        }
        console.log("end");
    } catch(error) {
        console.log(error);
    }
}

RunProc();