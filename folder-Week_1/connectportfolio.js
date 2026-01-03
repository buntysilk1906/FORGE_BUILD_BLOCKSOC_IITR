import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import { contractAddress, abi } from "./constant.js";

const contractinput = document.getElementById("contractbtn")
const connectbtn = document.getElementById("connectweb3")
const contractoutput = document.getElementById("output")
contractinput.addEventListener("click", outputsimplestorage)
connectbtn.addEventListener("click", connect)

let contract;
async function connect() {
    if (!window.ethereum) {
        alert("MetaMask not found");
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()

    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log("Deploying , please wait...");
    connectbtn.innerHTML = "Connected"
}

async function outputsimplestorage() {
    if (!contract) {
        alert("Please connect wallet first");
        return;
    }
    contractoutput.innerHTML = "Loading..."
    const getinput = Number(document.getElementById("enter").value)
    const storevalue = await contract.store(getinput)
    const transactionreceipt = await storevalue.wait(1)

    const currentvalue = await contract.retrieve()
    const decvalue = currentvalue.toString()
    contractoutput.innerText = "Current value: " + " " + decvalue

}



