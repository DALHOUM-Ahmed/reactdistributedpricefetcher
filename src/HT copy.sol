// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract HelloToken is ERC20 {
  address payable public owner;

  constructor() ERC20("HelloToken", "HT") {
    owner = payable(msg.sender);
    _mint(10000);
    decimals;
  }

  function _mint(uint _value) private {
    _mint(owner, _value * (10 ** decimals()));
  }

  function decimals() public view virtual override returns (uint8) {
    return 6;
  }
}
