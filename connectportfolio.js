import {
    createWalletClient,
    custom,
    createPublicClient,
    defineChain
} from "https://esm.sh/viem"

import { sepolia } from "https://esm.sh/viem/chains"

import { contractAddress, abi } from "./constant.js"
const contractinput = document.getElementById("contractbtn")
const connectbtn = document.getElementById("connectweb3")
const contractoutput = document.getElementById("output")
contractinput.addEventListener("click", outputsimplestorage)
connectbtn.addEventListener("click", connect)
let getinput;
let accounts;
let walletClient;
let publicClient;
let currentChain;
async function connect() {
    if (!window.ethereum) {
        connectBtn.innerHTML = "Install MetaMask"
        return
    }

    walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
    })

    publicClient = createPublicClient({
        chain: sepolia,
        transport: custom(window.ethereum),
    })

    const [addr] = await walletClient.requestAddresses()
    accounts = addr


    connectbtn.innerHTML = "Connected"
}

async function outputsimplestorage() {
    getinput = Number(document.getElementById("enter").value)
    if (!walletClient || !publicClient) {
        alert("Connect wallet first")
        return
    }
    const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi,
        functionName: "store",
        args: [getinput],
        account: accounts,

    })
    const hash = await walletClient.writeContract(request)
    await publicClient.waitForTransactionReceipt({
        hash,
        confirmations: 2,
    })

    console.log("tx hash :", hash)
    getcontractoutput();

}

async function getcontractoutput() {
    if (!walletClient || !publicClient) {
        alert("Connect wallet first")
        return
    }
    const currentvalue = await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "retrieve",
    })
    const decvalue = currentvalue.toString()
    contractoutput.innerText = "Current value: " + " " + decvalue

}
