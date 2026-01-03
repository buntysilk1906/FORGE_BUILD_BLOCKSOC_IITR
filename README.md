# FORGE_BUILD_BLOCKSOC_IITR
showcasing my first project in FORGE_BUILD

##week_1:  

->Made a basic portfolio.html file meeting the evaluation criteria  
->Made a basic portfolio.js to interact with the webpage
->Wrote simplestorage.sol  
->deployed it using deploySS.s.sol and verified it manually in etherscan to get the ABI  
->Made a separate file constant.js for exporting contractAddress and abi  
->Using viem tools in connectportfolio.js , Interacted with the contract deployed online 

##error handling(week_1) : 

->network mismatch  
(inpage.js:1 MetaMask - RPC Error: RPC endpoint returned too many errors, retrying in 0.5 minutes. Consider using a different RPC endpoint. {code: -32002, message: 'RPC endpoint returned too many errors, retrying in…minutes. Consider using a different RPC endpoint.',)  

to deal this add a fixed network(ex sepolia) not chainId using  
import { sepolia } from "https://esm.sh/viem/chains"  
chainId is just a number.
chain is a full blockchain definition object.
viem needs the full object.  
writeContract() ❌ ignores chainId  
writeContract() ✅ requires chain 


