//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Script , console} from "forge-std/Script.sol" ;
import {Deposit} from "../src/Deposit.sol" ;

contract deployDeposit is Script{
  function run() public {
    Deposit deposit ;
vm.startBroadcast();
deposit = new Deposit();
vm.stopBroadcast();

console.log("contract Deployed At : "  , address(deposit)) ;
    
}
}
