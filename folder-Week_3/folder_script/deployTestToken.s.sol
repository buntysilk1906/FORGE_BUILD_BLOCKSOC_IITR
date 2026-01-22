// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Script } from "forge-std/Script.sol" ;
import {TestToken} from "../src/TestToken.sol" ;

contract deployTestToken is Script {
function run() external returns (TestToken) {
    string memory _name = "TokenB";
    string memory _symbol = "TKB";


    vm.startBroadcast();

    TestToken token = new TestToken(
        _name,
        _symbol
    );

    token.mint(msg.sender, 1_000_000 ether);
    vm.stopBroadcast();

    return token;
}

}