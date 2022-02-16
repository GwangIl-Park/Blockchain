// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract ERC20 is IERC20{
    uint256 private _total;
    mapping (address => uint256) private _balance;
    mapping (address => mapping (address => uint256)) private _allow;

    string internal name;
    string internal symbol;
    uint8 internal decimals;
    constructor(string memory _name, string memory _symbol, uint8 _decimals)
    {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        _mint(msg.sender, (10000 * uint256(10 ** decimals)));
    }
    function _mint(address _account, uint256 _amount) internal returns (bool)
    {
        require(_account!=address(0));
        _balance[_account]+=_amount;
        _total+=_amount;
        emit Transfer(address(0), _account, _amount);
        return true;
    }

    function totalSupply() public override view returns (uint256)
    {
        return _total;
    }
    function balanceOf(address _account) public override view returns (uint256)
    {
        return _balance[_account];
    }
    function _transfer(address _from, address _to, uint256 _amount) private returns (bool)
    {
        require(_to != address(0), "Transfer To Address 0");
        require(_balance[_from] >=_amount, "amount over balance");
        _balance[_from] -= _amount;
        _balance[_to] += _amount;
        emit Transfer(_from, _to, _amount);
        return true;
    }
    function transfer(address _to, uint256 _amount) public override returns (bool)
    {
        return _transfer(msg.sender, _to, _amount);
    }
    function allowance(address _owner, address _spender) public override view returns (uint256)
    {
        return _allow[_owner][_spender];
    }
    function approve(address _spender, uint256 _amount) public override returns (bool)
    {
        require(_spender!=address(0));
        _allow[msg.sender][_spender]+=_amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _amount) public override returns (bool)
    {
        require(_from!=address(0));
        require(_to!=address(0));
        require(_balance[_from]>=_amount);
        require(_allow[_from][msg.sender]>=_amount);
        
        _allow[_from][msg.sender]-=_amount;

        return _transfer(_from,_to,_amount);
    }
}