//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Script } from "forge-std/Script.sol" ;
import {TestToken} from "../src/TestToken.sol";
import {Amm} from "../src/Amm.sol";

contract InitLiquidity is Script{
    function run() external {
  address amm = 0x38e2146e73b8b58b195232f713B3B828e0740836;

vm.startBroadcast();

 Amm(amm).addToken(100 ether, 100 ether);
 vm.stopBroadcast();

    }   
}