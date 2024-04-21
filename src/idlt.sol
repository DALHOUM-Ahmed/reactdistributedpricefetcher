// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IdolTerraToken is ERC20 {
  constructor() ERC20("IdolTerra Token", "IDLT") {
    _mint(msg.sender, 2 * 10 ** 9 * 10 ** 18);
  }
}
