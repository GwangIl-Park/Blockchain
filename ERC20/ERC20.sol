// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./IERC20.sol";

contract ERC20 is IERC20{
    uint256 private total_token;
    mapping (address => uint256) private balance_map;
    mapping (address => mapping (address => uint256)) private allow_map;

    string private token_name;
    string private token_symbol;
    uint8 private token_decimals;
    constructor(string memory _name, string memory _symbol, uint8 _decimals)
    {
        token_name = _name;
        token_symbol = _symbol;
        token_decimals = _decimals;
        _mint(msg.sender, (10000 * uint256(10 ** token_decimals)));
    }
    function _mint(address _account, uint256 _amount) internal returns (bool)
    {
        require(_account!=address(0));
        balance_map[_account]+=_amount;
        total_token+=_amount;
        emit Transfer(address(0), _account, _amount);
        return true;
    }

    function totalSupply() public override view returns (uint256)
    {
        return total_token;
    }
    function balanceOf(address _account) public override view returns (uint256)
    {
        return balance_map[_account];
    }
    function _transfer(address _from, address _to, uint256 _amount) internal returns (bool)
    {
        require(_from != address(0), "Transfer From Address 0");
        require(_to != address(0), "Transfer To Address 0");
        require(balance_map[_from] >=_amount, "amount over balance");
        balance_map[_from] -= _amount;
        balance_map[_to] += _amount;
        emit Transfer(_from, _to, _amount);
        return true;
    }
    function transfer(address _to, uint256 _amount) public override returns (bool)
    {
        return _transfer(msg.sender, _to, _amount);
    }
    function allowance(address _owner, address _spender) public override view returns (uint256)
    {
        return allow_map[_owner][_spender];
    }
    function approve(address _spender, uint256 _amount) public override returns (bool)
    {
        require(_spender!=address(0));
        allow_map[msg.sender][_spender]+=_amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _amount) public override returns (bool)
    {
        require(allow_map[_from][msg.sender]>=_amount);
        
        allow_map[_from][msg.sender]-=_amount;

        return _transfer(_from,_to,_amount);
    }
    function name() public view override returns (string memory)
    {
        return token_name;
    }
    function symbol() public view override returns (string memory)
    {
        return token_symbol;
    }
    function decimals() public view override returns (uint8)
    {
        return token_decimals;
    }
}