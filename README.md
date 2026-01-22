# FORGE_BUILD_BLOCKSOC_IITR
showcasing my first project in FORGE_BUILD

# week_1:  

->Made a basic index.html file meeting the evaluation criteria  
->Made a basic portfolio.js to interact with the webpage  
->Wrote simplestorage.sol  
->deployed it using deploySS.s.sol and verified it manually in etherscan to get the ABI  
->Made a separate file constant.js for exporting contractAddress and abi  
->Using ether.js tool in connectportfolio.js , Interacted with the contract deployed online  

# week_2:  

->Made a basic index.html and deposit_css.css to clearly view amount , transaction, deposits and withdrawals.  
->Wrote Deposit.sol with fund() , withdraw() , structure for storing depositor's address and Amount , mappings for updating the amount(if any)  
->Wrote test comprising of 4 test to test everything  
->using ether.js , wrote fundme.js to actively interact with the webpage and contract deployed on sepolia testnet
->wrote deployDeposit.s.sol to deploy the contract on the mentioned chain  

## Error Handling---Week_2:

-> In fundme.js (depositinfo.Amount is a BigNumber in wei) and that's we can't just add it manually and show it on the webpage for that , 
>totalWei = add(depositinfo.Amount) for adding the bigNumbers  
>const totalEth = ethers.utils.formatEther(totalWei) thereby formatting in ether  

-> In HTML background transparency is not applicable in jpg or jpef file  
>You must use:Transparent PNG OR SVG logo

-> Error handling with .env file  
> Load your .env properly(source .env)
> remove the spaces around = so that Foundry can read them properly
> Make sure foundry.toml points to Sepolia correctly ([rpc_endpoints] sepolia = "${RPC_URL}")


# week_3  

->Wrote Amm.sol comprising of all the concept of Amm which includes(Liquidity adding , Withdrawal of liquidity , Swap tokens) and deployed it on chain  
->thereafter , I made two Test Tokens and listed up the properties of those Test Token in TestToken.sol and deployed it on chain  
->thereafter , I approved minted and approved the token  
->wrote a script to Initiate Liquididty  
->Set up the Project in Next js  
->With some backend and frontend concluded the Amm Project  

## Error Handling---week_2:  
->Account will stay connected even if we refresh the page  
>












