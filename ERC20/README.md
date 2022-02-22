# ERC20

ERC20 is unopinionated.

ERC20 presets is opinionated.

* IERC20 approve

트랜잭션 순서에 따라 allowance의 위험성이 있다. spender의 allowance를 0으로 set한 후에 원하는 값으로 수정할 것을 추천

* transfer, send, call 

transfer, send 는 가스 소비량이 2300으로 제한

call은 reentracy attack 가능성이 있다.

contract A {
B b;
address wallet;
event EventA(string indexed name);
constructor (B _b) public payable{
b = B(_b);
}
function () external payable {
sendToB();
emit EventA('excuted A fallback function');
}
function sendToB( ) public returns (uint) {
b.get();
}
function getBalance() public view returns (uint256) {
return address(this).balance;
}
}

contract B {
event EventB(string indexed name);
constructor () public payable{
}
function get() public {
msg.sender.transfer(1 ether);
//msg.sender.call.value(1 ether)("")
}
function getBalance() public view returns (uint256) {
return address(this).balance;
}
function () external payable {
emit EventB('excuted B fallback function');
}
}


출처: https://anomie7.tistory.com/56


istanbul hardfork 이후, 가스 비용이 상승하면서 2300으로 부족할 수 있기 때문에 call을 권장

* string memory쓰는 이유

string은 reference 타입이기 때문에 인자로 넘겨줄때 memory타입으로 변환하는 과정이 필요