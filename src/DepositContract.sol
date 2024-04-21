// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract DepositWithdrawEth {
  receive() external payable {}

  fallback() external payable {}

  HelloTokenInterface private helloToken;

  constructor(address _helloTokenAddress) {
    helloToken = HelloTokenInterface(_helloTokenAddress);
  }

  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  function sendViaTransfer(address payable _to) public payable {
    _to.transfer(msg.value);
  }

  function sendViaSend(address payable _to) public payable {
    bool sent = _to.send(msg.value);
    require(sent, "Failed to send Eth");
  }

  function sendViaCall() public payable {
    require(
      helloToken.transfer(msg.sender, msg.value),
      "Failed to send HT tokens"
    );
    //payable(msg.sender).transfer(msg.value);
  }

  function withdrawEth(uint256 amount) external {
    require(amount > 0, "Amount must be greater than 0");
    require(address(this).balance >= amount, "Insufficient balance");

    payable(msg.sender).transfer(amount);

    require(
      helloToken.transferFrom(msg.sender, address(this), amount),
      "Failed to send HT tokens"
    );
  }

  function getHTSenderBalance() public view returns (uint256) {
    return helloToken.balanceOf(msg.sender);
  }

  function getHTContractBalance() public view returns (uint256) {
    return helloToken.balanceOf(address(this));
  }
}

interface HelloTokenInterface {
  function transfer(address recipient, uint256 amount) external returns (bool);
  function balanceOf(address account) external view returns (uint256);
  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) external returns (bool);
}
