//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Test , console} from "forge-std/Test.sol" ;
import {Deposit} from "../src/Deposit.sol" ;

contract deposittest is Test{
    Deposit deposit ;
    address deployer = address(1);
    uint256 constant send_value = 1 ether;

    function setUp() public{
        vm.prank(deployer);
       deposit = new Deposit();
       vm.deal(deployer, 10 ether);
    }
    function test_owner_is_deployer() public{
       // us->FundMeTest->FundMe
    assertEq(deposit.owner(), deployer);

    }

    function test_withdraw_revert_if_not_owner() public{
        address attacker = address(2);
        vm.prank(attacker);
        vm.expectRevert();
        deposit.withdraw(); //should fail but due to expextRevert it will pass

    }
     function test_withdraw_pass_if_owner() public{
        address deploy_test= address(1);
        vm.prank(deploy_test);
        deposit.withdraw();  

    }

    function test_after_deposit_data_stored() public{
      
      vm.prank(deployer);
      deposit.fund{value: send_value}();
    uint256 c_value = deposit.AddressToAmountFunded(deployer);
    assertEq(c_value, send_value);

    }
    
    
    
   
}