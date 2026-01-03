//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "forge-std/Script.sol" ; 
import "../src/simplestorage.sol" ;
contract deploySS is Script{
    function run() external returns(simplestorage){
vm.startBroadcast();
simplestorage simpleStorage = new simplestorage();
vm.stopBroadcast();
return simpleStorage ;

    }
}