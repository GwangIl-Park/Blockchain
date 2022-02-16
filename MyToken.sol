// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./Owner.sol";

contract MyToken is ERC20, Owner{
    constructor() ERC20("GWANGIL","PGI",18){}
    function getName() public view returns (string memory)
    {
        return name;
    }
    function setName(string memory _name) public b_owner
    {
        name = _name;
    }
    function getSymbol() public view returns (string memory)
    {
        return symbol;
    }
    function setSymbol(string memory _symbol) public b_owner
    {
        symbol = _symbol;
    }
    function mintToken(uint256 _amount) public b_owner
    {
        _mint(getOwner(), _amount);
    }
}