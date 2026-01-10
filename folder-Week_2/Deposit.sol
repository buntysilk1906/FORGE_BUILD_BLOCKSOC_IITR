// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract Deposit{

struct people {
    address Depositor_Address ;
    uint256 Amount ;
}
address public owner ;
people[] public p ;
mapping(address=>uint256) public AddressToAmount;

constructor(){
owner = msg.sender;
}
error depositerror();

modifier onlyowner(){
    if(owner != msg.sender ) revert depositerror();
    _;
}

function fund () payable public{
p.push(people(msg.sender , msg.value));
AddressToAmount[msg.sender] += msg.value ;

}

function AddressToAmountFunded (address D_address ) public view returns(uint256 ) {
uint256 corresponding_deposit = AddressToAmount[D_address];
return corresponding_deposit ;
}

function withdraw() public onlyowner(){
    
    for(uint funderindex = 0 ;funderindex < p.length;funderindex++ ){
    address funder_address  = p[funderindex].Depositor_Address;
    AddressToAmount[funder_address] = 0 ;
    }
    delete p;

    (bool success,) = owner.call{value:address(this).balance}("");
    require (success , "Not able to Withdraw");
}
function showOwner()public view returns (address){
    return owner ;
} 
function getlength()public view returns(uint256){
    return p.length;
}
function p_data(uint256 index) public view returns(address Depositor_Address , uint256 Amount){
    people memory info = p[index];
    return (info.Depositor_Address , info.Amount);
}
}