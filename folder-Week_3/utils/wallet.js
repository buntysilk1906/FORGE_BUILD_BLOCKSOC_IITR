"use client";

import { ethers } from "ethers";
import { useWallet } from "../components/WalletContext";

export default function ConnectWallet({ label = "Connect Wallet" }) {
    const { signer, account, setSigner, setAccount } = useWallet();

    const connect = async () => {
        if (!window.ethereum) return alert("MetaMask not installed");

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setSigner(signer);

    };


    if (account) {
        return (
            <button style={{ cursor: "default" }}>
                Connected : {account.slice(0, 6)}…{account.slice(-4)}
            </button>
        );
    }


    return <button onClick={connect}>{label}</button>;
}
