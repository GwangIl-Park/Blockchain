// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Owner{
    address private owner;
    constructor(){
        owner = msg.sender;
    }
    modifier b_owner{
        require(msg.sender == owner);
        _;
    }
    function getOwner() public view returns (address)
    {
        return owner;
    }
}