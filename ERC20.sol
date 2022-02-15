pragma solidity ^0.8.0;

import "./IERC20.sol";

contract ERC20 is IERC20{
    uint256 private _total;
    mapping (address => uint256) private _balance;
    mapping (address => mapping (address => uint256)) private _allow;
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
        require(_from != address(0) && _to != address(0) && _balance[_from] >=_amount);
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
        return _allow[_spender][_owner];
    }
    function approve(address _spender, uint256 _amount) public override returns (bool)
    {
        require(_spender!=address(0));
        _allow[_spender][msg.sender]+=_amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _amount) public override returns (bool)
    {
        require(_from!=address(0) && _to!=address(0) && _balance[_from]>=_amount);
        if(_allow[_from][_to]<_amount)
        {
            _allow[_from][_to]=0;
        }
        else
        {
            _allow[_from][_to]-=_amount;
        }
        emit Approval(_from,_to,_amount);
        return _transfer(_from,_to,_amount);
    }
}