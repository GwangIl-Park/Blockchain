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
    mapping (address => uint256) private fund_investor;
    address[] private investors;

    event Invest(address indexed _investor, uint256 _amount);

    constructor(address _token, uint256 _price, uint256 _goal, uint256 _deadline){
        token = MyToken(_token);
        price = _price;
        owner = msg.sender;
        goal = _goal;
        deadline = _deadline;
        fund = 0;
        total_token = token.totalSupply();
        remain_token = total_token;
    }
    receive() external payable {
        uint256 amount = msg.value;
        address investor = msg.sender;
        uint256 tokenAmount = amount * price;
        require(tokenAmount <= remain_token,"no more token");
        remain_token -= tokenAmount;
        fund += amount;
        bool bexist = false;
        for(uint i=0;i<investors.length;i++)
        {
            if(investors[i]==investor)
            {
                bexist = true;
                break;
            }
        }
        if(!bexist)
        {
            investors.push(investor);
        }
        fund_investor[investor]+=amount;
        token.sellToken(investor, tokenAmount);
        emit Invest(investor, amount);
    }

    modifier timeEnd()
    {
        require(block.timestamp>=deadline, "not yet");
        _;
    }
    function checkGoal() public payable timeEnd
    {
        if(fund >= goal)
        {
            payable(owner).call{value:fund};
        }
        else
        {
            for(uint i=0;i<investors.length;i++)
            {
                payable(investors[i]).call{value:fund_investor[investors[i]]};
            }
        }
    }
}