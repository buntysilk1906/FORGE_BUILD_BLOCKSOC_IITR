import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import { ContractAddress, abi } from "./constant.js";

let connectbtn = document.getElementById("connect")
let withdrawbtn = document.getElementById("w")
let ownerbtn = document.getElementById("o")
let amountshowbtn = document.getElementById("amountshow")
let ownershow = document.getElementById("owner")
let depositbtn = document.getElementById("f")
let listbtn = document.getElementById("list")
let atfshow = document.getElementById("atf")
let amountgetbtn = document.getElementById("a")

connectbtn.addEventListener("click", f_connect)
withdrawbtn.addEventListener("click", f_withdraw)
ownerbtn.addEventListener("click", f_owner)
depositbtn.addEventListener("click", f_deposit)
listbtn.addEventListener("click", f_address_to_amount)
amountgetbtn.addEventListener("click", f_Contract_balance)

let deposit;
let TotalAmount = 0;
let provider;

async function f_connect() {
    if (!window.ethereum) {
        alert("Metamask not found")
    }
    console.log("Connecting...")
    provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    deposit = new ethers.Contract(ContractAddress, abi, signer)


    connectbtn.innerHTML = "Connected"
    f_Contract_balance()


}
async function f_deposit() {
    if (!deposit) {
        alert("connect the wallet first")
    }
    amountshowbtn.innerHTML = "Depositing..."
    let inputvalue = document.getElementById("sendvalue").value
    try{
    const deposit_tx = await deposit.fund({ value: ethers.utils.parseEther(inputvalue) })
        await deposit_tx.wait(1)
    }catch(error){
         if (error.code === 4001) {
        console.log("User rejected the transaction")
    } else {
        console.error("Transaction failed:", error)
    }

    await f_Contract_balance()
    }
    const hash = await deposit_tx.wait(1)
    console.log("tx-hash", hash)

    f_Contract_balance()
    f_address_to_amount()
}

async function f_owner() {
    if (!deposit) {
        alert("connect the wallet first")
    }
    let owner_address = await deposit.showOwner()
    ownershow.innerText = "Owner's Address : " + owner_address
}

async function f_withdraw() {
    if (!deposit) {
        alert("connect the wallet first")
    }
    const balance = await provider.getBalance(deposit.address);
    if (balance.isZero()) {
        alert("The contract has NO BALANCE")
    }
    amountshowbtn.innerHTML = "Withdrawing..."
    const transaction = await deposit.withdraw();
    const transactionrecipt = await transaction.wait(1)
    console.log("Withdraw amount receipt", transactionrecipt)
    f_Contract_balance()
    f_address_to_amount()

}
async function f_Contract_balance() {
    if (!deposit) {
        alert("connect the wallet first")
    }
    let total_depositer = await deposit.getlength()
    let total_wei = ethers.BigNumber.from(0);
    amountshowbtn.innerHTML = "Getting Contract Balance.."
    for (let i = 0; i < total_depositer; i++) {
        const depositinfo = await deposit.p(i)
        total_wei = total_wei.add(depositinfo.Amount)
    }
    TotalAmount = ethers.utils.formatEther(total_wei)
    amountshowbtn.innerHTML = "Amount till now : " + TotalAmount + " " + "ETH"

}

async function f_address_to_amount() {
    if (!deposit) {
        alert("connect the wallet first")
    }
    let total_depositer = await deposit.getlength()
    atfshow.innerHTML = "";
    for (let i = 0; i < total_depositer; i++) {
        const depositinfo = await deposit.p(i)
        atfshow.innerHTML += `Depositor : ${depositinfo.Depositor_Address} || Amount : ${ethers.utils.formatEther(depositinfo.Amount)} ETH <br><br>`;
    }
}




