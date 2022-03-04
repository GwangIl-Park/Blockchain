//exe: node exams.js [getBalance] [addr]
//exe: node exams.js [sendTx] [from addr] [to addr] [amount] 

const libMyToken = require("../libs/libMyToken.js");
const libCrowdsale = require("../libs/libCrowdsale.js");

const getBalance = libMyToken.getBalance;
const sendTransaction = libMyToken.sendTransaction;
const makeKeystore = libMyToken.makeKeystore;
const deploy = libMyToken.deploy;
const deploy2_token = libMyToken.deploy2_token;
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

let proc_getBalance = async function(){
    try{
        if(process.argv.length != 4)
        {
            throw new Error("Usage : node exams/exams.js makeKeystore [address]");
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
        if(process.argv.length != 5)
        {
            throw new Error("Usage : node exams/exams.js makeKeystore [privateKey] [password]");
        }
        makeKeystore(arguments[0],arguments[1]);
    }
    catch(error){
        console.log(error);
    }
}

let proc_deploy = async function(){
    try{
        if(process.argv.length != 5)
        {
            throw new Error("Usage : node exams/exams.js deploy [account] [password]");
        }
        await deploy(arguments[0],arguments[1]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_deploy2_token = async function(){
    try{
        if(process.argv.length != 5)
        {
            throw new Error("Usage : node exams/exams.js deploy2_token [account] [privateKey]");
        }
        await deploy2_token(arguments[0],arguments[1]);
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
        if(process.argv.length != 8)
        {
            throw new Error("Usage : node exams/exams.js transfer [ca] [from] [privateKey] [to] [amount]");
        }
        await transfer(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
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
        if(process.argv.length != 9)
        {
            throw new Error("Usage : node exams/exams.js approve [ca] [eoa] [privateKey] [from] [to] [amount]");
        }
        await approve(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_transferFrom = async function(){
    try{
        if(process.argv.length != 9)
        {
            throw new Error("Usage : node exams/exams.js transferFrom [ca] [eoa] [privateKey] [from] [to] [amount]");
        }
        await transferFrom(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_deployCrowdsale = async function(){
    try{
        if(process.argv.length != 8)
        {
            throw new Error("Usage : node exams/exams.js deployCrowdsale [eoa] [privateKey] [token] [price] [goal]");
        }
        await deployCrowdsale(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_checkGoal = async function(){
    try{
        if(process.argv.length != 6)
        {
            throw new Error("Usage : node exams/exams.js checkGoal [ca] [eoa] [privateKey]");
        }
        await checkGoal(arguments[0],arguments[1],arguments[2]);
    }
    catch (error){
        console.log(error);
    }
}

let proc_getFailEther = async function(){
    try{
        if(process.argv.length != 6)
        {
            throw new Error("Usage : node exams/exams.js getFailEther [ca] [eoa] [privateKey]");
        }
        await getFailEther(arguments[0],arguments[1],arguments[2]);
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
            case "makeKeystore":{proc_makeKeystore(process.argv[3],process.argv[4]);break;}
            case "deploy":{await proc_deploy(process.argv[3],process.argv[4]);break;}   //key from keystore file
            case "deploy2_token":{await proc_deploy2_token(process.argv[3],process.argv[4]);break;}  //for ganache test (input key)
            case "totalSupply":{await proc_totalSupply(process.argv[3]);break;}
            case "balanceOf":{await proc_balanceOf(process.argv[3], process.argv[4]);break;}
            case "transfer":{await proc_transfer(process.argv[3], process.argv[4],process.argv[5],process.argv[6],process.argv[7]);break;}
            case "allowance":{await proc_allowance(process.argv[3], process.argv[4],process.argv[5]);break;}
            case "approve":{await proc_approve(process.argv[3], process.argv[4],process.argv[5],process.argv[6],process.argv[7],process.argv[8]);break;}
            case "transferFrom":{await proc_transferFrom(process.argv[3], process.argv[4],process.argv[5],process.argv[6],process.argv[7],process.argv[8]);break;}
            case "deployCrowdsale":{await proc_deployCrowdsale(process.argv[3], process.argv[4],process.argv[5],process.argv[6],process.argv[7]);break;}
            case "checkGoal":{await proc_checkGoal(process.argv[3], process.argv[4],process.argv[5]);break;}
            case "getFailEther":{await proc_getFailEther(process.argv[3], process.argv[4],process.argv[5]);break;}
            case "getGoal":{await proc_getGoal(process.argv[3]);break;}
            case "getFund":{await proc_getFund(process.argv[3]);break;}
            default: {throw new Error("Invalid category!");}
        }
        console.log("end");
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

RunProc();