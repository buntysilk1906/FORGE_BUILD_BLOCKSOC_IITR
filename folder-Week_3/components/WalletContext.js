"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [reserves, setReserves] = useState({ a: "0", b: "0" });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function reconnect() {
            if (!window.ethereum) {
                setLoading(false);
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_accounts", []);

            if (accounts.length > 0) {
                const s = await provider.getSigner();
                setSigner(s);
                setAccount(accounts[0]);
            }

            setLoading(false);
        }

        reconnect();
    }, []);

    return (
        <WalletContext.Provider
            value={{
                signer,
                setSigner,
                account,
                setAccount,
                reserves,
                setReserves,
                loading,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
    return ctx;
}
