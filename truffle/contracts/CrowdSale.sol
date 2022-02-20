// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./MyToken.sol";
import "./Owner.sol";

contract CrowdSale is Owner{
    //토큰 주소
    address private token;
    //1wei당 토큰 가격
    uint256 private price;
    address private owner;
    uint256 private goal;
    uint256 private fund;
    uint256 private deadline;
    mapping (address => uint256) private fund_investor;
    address[] private investors;

    event Invest(address indexed _investor, uint256 _amount);

    constructor(address _token, uint256 _price, uint256 _goal){
        token = _token;
        price = _price;
        owner = msg.sender;
        goal = _goal;
        fund = 0;
    }
    receive() external payable {
        uint256 amount = msg.value;
        uint256 tokenAmount = amount * price;
        fund += amount;
        bool bexist = false;
        for(uint i=0;i<investors.length;i++)
        {
            if(investors[i]==msg.sender)
            {
                bexist = true;
                break;
            }
        }
        if(!bexist)
        {
            investors.push(msg.sender);
        }
        fund_investor[msg.sender]+=amount;
        MyToken(token).transfer(msg.sender, tokenAmount);
        emit Invest(msg.sender, amount);
    }

    modifier timeEnd()
    {
        if(block.timestamp>=deadline)
        _;
    }
    function checkGoal() public payable timeEnd{
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