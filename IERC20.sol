// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    //Returns the amount of tokens in existence
    function totalSupply() external view returns (uint256);
    //Returns the amount of tokens owned by account
    function balanceOf(address _account) external view returns (uint256);
    /*
    Moves amount tokens from caller's account to _to.
    Returns a boolean value indicating whether the operation succeeded.
    Emits a Transfer event
    */
    function transfer(address _to, uint256 _amount) external returns (bool);
    /*
    Returns the remaining number of tokens that spender will be allowed to
    spend on behalf of owner through transferFrom. This is zero by
    default.
    This value change when approve or transferFrom are called.
    */
    function allowance(address _owner, address _spender) external view returns (uint256);
    /*
    Sets amount as the allowance of spender over the caller's tokens.
    Returns a boolean value indicating whether the operation succeeded.
    Emits an Approval event.
    */
    function approve(address _spender, uint256 _amount) external returns (bool);
    /*
    Moves _amount tokens from _from to _to using the allowance mechanism.
    _amount is then deducted from the caller's allowance.
    Returns a boolean value indicating whether the operation succesded.
    Emits a Transfer event.
    */
    function transferFrom(address _from, address _to, uint256 _amount) external returns (bool);
    /*
    Emitted when _value tokens are moved from one account to another.
    _value may be zero.
    */
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    /*
    Emitted when the allowance of a _spender for an _owner is set by a call to
    approve. value is the new allowance.
    */
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}