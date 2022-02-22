// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./ERC20.sol";
import "./Owner.sol";

contract MyToken is ERC20, Owner{
    constructor(string memory _name, string memory _symbol, uint8 _decimals) ERC20(_name,_symbol,_decimals)
    {
        _mint(msg.sender, 10000*uint256(10**_decimals));
    }
    function mintToken(uint256 _amount) public b_owner
    {
        _mint(getOwner(), _amount);
    }
    function sellToken(address _purchaser, uint256 _amount) public
    {
        _transfer(getOwner(), _purchaser, _amount);
    }
}