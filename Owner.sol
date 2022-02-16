// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Owner{
    address private _owner;
    constructor(){
        _owner = msg.sender;
    }
    modifier b_owner{
        require(msg.sender == _owner);
        _;
    }
    function getOwner() public view returns (address)
    {
        return _owner;
    }
}