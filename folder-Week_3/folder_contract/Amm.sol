// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IERC20 {
    function transfer(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);
}
    
contract Amm{
 IERC20 public tokenA;
 IERC20 public tokenB;

 uint256 public reserveA;
 uint256 public reserveB;
 uint256 public supplierCount;


 uint256 constant FEE_NUMERATOR = 997;
 uint256 constant FEE_DENOMINATOR = 1000;
 uint256 constant MIN_SLIPPAGE = 2 ;



event Required_ADD_Amount(uint256 a , uint256 b);
event Required_WITHDRAW_Amount(uint256 a, uint256 b );

 uint256 public totalSupply; 
 mapping(address => uint256) public balanceOf;

 constructor( address token_a, address token_b){
tokenA = IERC20(token_a);
tokenB = IERC20(token_b); 
 }

function addToken(uint256 a , uint256 b)external returns(uint256 shares) {
require(a>0 && b>0 , "Zero Amount");
uint256 changed_a;
uint256 changed_b;

if(totalSupply == 0 ){
shares = sqrt(a*b);
changed_a = a;
changed_b = b;
totalSupply += shares;

}
else{
uint256 a_share = (a * totalSupply)/reserveA;
uint256 b_share = (b * totalSupply) /reserveB;

if(a_share < b_share ){
changed_a = (a_share*reserveA) / totalSupply ;
changed_b = (changed_a * reserveB) / reserveA;

}
else{
    changed_b = (b_share * reserveB) / totalSupply;
    changed_a = (changed_b * reserveA) / reserveB;
}
shares = min(a_share  , b_share);
}

tokenA.transferFrom(msg.sender, address(this), changed_a);
tokenB.transferFrom(msg.sender, address(this), changed_b);
emit Required_ADD_Amount(changed_a, changed_b);

if (balanceOf[msg.sender] == 0) {
    supplierCount += 1;
}

supplierCount += 1;
balanceOf[msg.sender] += shares;
totalSupply += shares;
reserveA += changed_a;
reserveB += changed_b;

 }

 function withdrewToken(uint256 W_share) external {
require(W_share > 0 , "ZERO WITHDRAWAL");
uint256 corresponding_share  = balanceOf[msg.sender];

require(W_share <= corresponding_share , "Withdrawing more than the share");

uint256 a_fund = (W_share * reserveA) / totalSupply;
uint256 b_fund = (W_share * reserveB) / totalSupply;

tokenA.transfer(msg.sender, a_fund);
tokenB.transfer(msg.sender, b_fund);

emit Required_WITHDRAW_Amount(a_fund, b_fund);
totalSupply -= W_share;
 balanceOf[msg.sender] -= W_share;

if (balanceOf[msg.sender] == 0) {
    supplierCount -= 1;
}

reserveA -= a_fund;
reserveB -= b_fund;

 }

 function swapBforA(uint256 amountBIn , uint256 expectedAmountOut) external returns(uint256 amountAOut){
require(amountBIn > 0 , "Zero Amount");
require(reserveA > 0 && reserveB > 0 , "There is no money in the pool");

tokenB.transferFrom(msg.sender, address(this), amountBIn);

uint256 minAmountOut =
    (expectedAmountOut * (100 - MIN_SLIPPAGE)) / 100;

uint256 amountInWithFee = (amountBIn*997)/100;

amountAOut = (amountInWithFee * reserveA) / (reserveB + amountInWithFee);
require(amountAOut > minAmountOut , "Too Much Slippage");

tokenA.transfer(msg.sender, amountAOut);

reserveB += amountBIn;
reserveA -= amountAOut;

 }
 function swapAforB(uint256 amountAIn , uint256 expectedAmountOut) external returns(uint256 amountBOut){
require(amountAIn > 0 , "Zero Amount");
require(reserveA > 0 && reserveB > 0 , "There is no money in the pool");


tokenA.transferFrom(msg.sender, address(this), amountAIn);

uint256 minAmountOut =
    (expectedAmountOut * (100 - MIN_SLIPPAGE)) / 100;

uint256 amountInWithFee = (amountAIn*997)/100;

amountBOut = (amountInWithFee * reserveB) / (reserveA + amountInWithFee);
require(amountBOut > minAmountOut , "Too Much Slippage");

tokenB.transfer(msg.sender, amountBOut);

    reserveA += amountAIn;
    reserveB -= amountBOut;

 }

/*Helper function*/

 function min(uint256 x, uint256 y) private pure returns (uint256) {
        return x <= y ? x : y;
    }

function sqrt(uint256 y) private pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

/*view function*/
    function getMinSlippage()public pure returns(uint256){
return MIN_SLIPPAGE;
    }

    function getConstant()public view returns(uint256){
        return (reserveA * reserveB);
    }
    function getReserve()public view returns(uint256 , uint256 ){
return(reserveA , reserveB);
    }

    function getSupplier()public view returns(uint256){
        return supplierCount ;
    }
}
