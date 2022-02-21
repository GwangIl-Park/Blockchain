// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./IERC20Metadata.sol";

contract ERC20 is IERC20Metadata{
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
    function totalSupply() public override view returns (uint256)
    {
        return total_token;
    }
    function balanceOf(address _account) public override view returns (uint256)
    {
        return balance_map[_account];
    }
    function transfer(address _to, uint256 _amount) public override returns (bool)
    {
        require(_to!=address(0), "in transfer : to address 0");
        require(balance_map[msg.sender]>=_amount, "in trannfer : amount over balance");
        _transfer(msg.sender, _to, _amount);
        return true;
    }
    function allowance(address _owner, address _spender) public override view returns (uint256)
    {
        return allow_map[_owner][_spender];
    }
    function approve(address _spender, uint256 _amount) public override returns (bool)
    {
        _approve(msg.sender, _spender, _amount);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _amount) public override returns (bool)
    {   
        require(_from!=address(0), "in transferFrom : from address 0");
        require(_to!=address(0), "in transferFrom : to address 0");
        require(balance_map[_from]>=_amount, "in tranferFrom : amount over balance");
        
        uint256 _allowance = allowance(_from,msg.sender);
        if(_allowance < type(uint256).max)
        {
            require(_allowance>=_amount, "in transferFrom : amount over allowance");
            _approve(_from, msg.sender, _allowance - _amount);
        }

        _transfer(_from,_to,_amount);
        return true;
    }
    function _transfer(address _from, address _to, uint256 _amount) internal
    {
        require(_from != address(0), "in _transfer : from address 0");
        require(_to != address(0), "in _transfer : to Address 0");
        require(balance_map[_from] >=_amount, "amount over balance");
        balance_map[_from] -= _amount;
        balance_map[_to] += _amount;
        emit Transfer(_from, _to, _amount);
    }
    function _mint(address _account, uint256 _amount) internal
    {
        require(_account!=address(0), "in _mint : account address 0");
        balance_map[_account]+=_amount;
        total_token+=_amount;
        emit Transfer(address(0), _account, _amount);
    }
    function _approve(address _owner, address _spender, uint256 _amount) internal
    {
        require(_owner!=address(0), "in _approve : owner address 0");
        require(_spender!=address(0), "in _approve : spender address 0");
        allow_map[_owner][_spender] = _amount;
        emit Approval(_owner, _spender, _amount);
    }

//non standard

    function increaseAllowance(address _spender, uint256 _addedValue) public returns (bool)
    {
        require(_spender!=address(0), "in increaseAllowance : spender address 0");
        allow_map[msg.sender][_spender] += _addedValue;
        emit Approval(msg.sender, _spender, allowance(msg.sender, _spender)+_addedValue);
        return true;
    }
    function decreaseAllowance(address _spender, uint256 _subtractedValue) public returns (bool)
    {
        require(_spender!=address(0), "in decreaseAllowance : spender address 0");
        allow_map[msg.sender][_spender] -= _subtractedValue;
        emit Approval(msg.sender, _spender, allowance(msg.sender, _spender)-_subtractedValue);
        return true;
    }
    function _burn(address _account, uint256 _amount) internal
    {
        require(_account!=address(0), "in _burn : account address 0");
        require(balance_map[_account]>=_amount, "in _burn : amount over balance");
        balance_map[_account]-=_amount;
        total_token-=_amount;
        emit Transfer(_account, address(0), _amount);
    }
    function _spendAllowance(address _owner, address _spender, uint256 _amount) internal
    {
        uint256 _allowance = allowance(_owner, _spender);
        if(_allowance!=type(uint256).max)
        {
            require(_allowance>=_amount,"in _spendAllowance : amount over allowance");
            _approve(_owner, _spender, _amount);
            emit Approval(_owner, _spender, _amount);
        }
    }

    //hooking?
    function _beforeTokenTransfer(address _from, address _to, uint256 _amount) internal virtual
    {
    }
    function _afterTokenTransfer(address _from, address _to, uint256 _amount) internal virtual
    {

    }
}