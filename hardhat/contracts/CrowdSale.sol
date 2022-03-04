// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./MyToken.sol";
import "./Owner.sol";

contract CrowdSale is Owner{
    MyToken private token;
    uint256 private price;
    address private owner;
    uint256 private goal;
    uint256 private fund;
    uint256 private deadline;
    uint256 private total_token;
    uint256 private remain_token;
    bool private b_end;
    bool private b_fail;
    mapping (address => uint256) private fund_investor;

    event Invest(address indexed _investor, uint256 _amount);

    constructor(address _token, uint256 _price, uint256 _goal){
        require(_token!=address(0), "token address 0");
        token = MyToken(_token);
        price = _price;
        owner = msg.sender;
        goal = _goal;// * (10**token.decimals());
        //deadline = block.timestamp + 1 days * _deadline;
        fund = 0;
        total_token = token.totalSupply();
        remain_token = total_token;
        b_fail = false;
        b_end = false;
    }
    receive() external payable {
        require(!b_end, "end");
        uint256 amount = msg.value;
        address investor = msg.sender;
        uint256 tokenAmount = amount * price;
        require(tokenAmount <= remain_token,"no more token");
        remain_token -= tokenAmount;
        fund += amount;
        fund_investor[investor]+=amount;
        token.sellToken(investor, tokenAmount);
        //token.transfer(investor, tokenAmount);
        emit Invest(investor, amount);
    }
    function checkGoal() public payable b_owner
    {
        b_end = true;
        if(fund >= goal)
        {
            bool bcheck = false;

            if(!bcheck)
            {
                payable(owner).call{value:fund};
                bcheck = true;
            }
        }
        else
        {
            b_fail = true;
        }
    }
    function getFailEther() public payable
    {
        require(b_end, "not end");
        require(b_fail, "not fail");
        require(fund_investor[msg.sender]!=0, "no ether");
        bool bcheck = false;

        if(!bcheck)
        {
            payable(msg.sender).call{value:fund_investor[msg.sender]};
            fund_investor[msg.sender]=0;
            bcheck = true;
        }
    }

    function getTokenAddress() public view returns (address)
    {
        return address(token);
    }
    function getPrice() public view returns (uint256)
    {
        return price;
    }
    function getGoal() public view returns (uint256)
    {
        return goal;
    }
    function getFund() public view returns (uint256)
    {
        return fund;
    }
    function getRemainToken() public view returns (uint256)
    {
        return remain_token;
    }
}

/*
* use reentrancy guard

bool locked = false;
require(!locked, "Reentrancy call");
locked = true;
payable(owner).call{value:fund};
locked = false;

* checks-effects-interactions pattern
*/