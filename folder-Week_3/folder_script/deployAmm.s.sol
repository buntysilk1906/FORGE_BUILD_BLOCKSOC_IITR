//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Script } from "forge-std/Script.sol" ;
import {Amm} from "../src/Amm.sol" ;

contract deployAmm is Script{

    function run() external returns (Amm) {
  address tA = 0xCB7f8777f7a2089A5EeEDF3d5F3E8f69Ba454F4a;
  address tB = 0x9D0e1dd93F91dA9Dc4aa25752fFD8aBF7d16fff1;

    vm.startBroadcast();

    Amm amm = new Amm(
       tA,
       tB
    );

    vm.stopBroadcast();

    return amm;
}

}