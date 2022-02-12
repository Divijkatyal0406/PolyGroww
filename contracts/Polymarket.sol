// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Polymarket {
    address public owner;
    address public polyToken;

    uint256 public totalMarkets = 0;
    constructor(address _polyToken) {
        owner = msg.sender;
        polyToken = _polyToken;
    }
}