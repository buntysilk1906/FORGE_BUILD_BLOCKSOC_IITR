"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ConnectWallet from "../../utils/wallet";
import GetContracts from "../../utils/contract";
import { useWallet } from "../../components/WalletContext";
import styles from "../../styles/WithdrawLiquidity.module.css";

export default function WithdrawLiquidity() {
    const { signer, account, loading } = useWallet();
    const [amm, setAmm] = useState(null);
    const [balance, setBalance] = useState("0");
    const [withdrawAmount, setWithdrawAmount] = useState("");

    useEffect(() => {
        if (loading) return;
        if (!signer) return;
        async function init() {
            const { Amm } = await GetContracts(signer);
            setAmm(Amm);
            const bal = await Amm.balanceOf(account);
            setBalance(ethers.formatEther(bal));
        }
        init();
    }, [signer, account, loading]);

    const handleWithdraw = async () => {
        if (!amm || !withdrawAmount || Number(withdrawAmount) <= 0) return;
        const tx = await amm.withdrewToken(ethers.parseEther(withdrawAmount));
        await tx.wait();
        alert("Withdrawal successful!");
        const bal = await amm.balanceOf(account);
        setBalance(ethers.formatEther(bal));
        setWithdrawAmount("");
    };

    return (

        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Withdraw Liquidity</h2>
                <p className={styles.info}>Your Pool Shares: {balance} LP Tokens</p>

                <input
                    className={styles.input}
                    type="number"
                    placeholder="Enter shares to withdraw"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                />

                <button className={styles.button} onClick={handleWithdraw}>
                    Withdraw
                </button>

                {!signer && (
                    <div className={styles.wallet}>
                        <ConnectWallet />
                    </div>
                )}
            </div>
        </div>

    );
}
