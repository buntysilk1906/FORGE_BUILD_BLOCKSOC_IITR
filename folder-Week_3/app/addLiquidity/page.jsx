"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import GetContracts from "../../utils/contract";
import { useWallet } from "../../components/WalletContext";
import ConnectWallet from "../../utils/wallet";
import styles from "../../styles/AddLiquidity.module.css";

export default function AddLiquidity() {
    const { signer, account } = useWallet();
    const [tokenAAmount, setTokenAAmount] = useState("");
    const [tokenBAmount, setTokenBAmount] = useState("");
    const [txStatus, setTxStatus] = useState("");
    const [userShare, setUserShare] = useState("0");

    const fetchUserShare = async () => {
        if (!signer || !account) return;
        const { Amm } = await GetContracts(signer);
        const userBalance = await Amm.balanceOf(account);
        const total = await Amm.totalSupply();
        if (total === 0n || userBalance === 0n) {
            setUserShare("0.0000");
            return;
        }
        const share = Number((userBalance * 1_000_000n) / total) / 10_000;
        setUserShare(share.toFixed(4));
    };

    const handleAddLiquidity = async () => {
        if (!signer || !account) return setTxStatus("Please connect wallet first.");
        if (!tokenAAmount || !tokenBAmount) return setTxStatus("Enter valid amounts");

        const { Amm, tokenA, tokenB } = await GetContracts(signer);
        const aWei = ethers.parseEther(tokenAAmount);
        const bWei = ethers.parseEther(tokenBAmount);

        await tokenA.approve(Amm.target, aWei);
        await tokenB.approve(Amm.target, bWei);

        const tx = await Amm.addToken(aWei, bWei);
        await tx.wait();
        setTxStatus("Liquidity added!");
        fetchUserShare();
    };

    useEffect(() => {
        fetchUserShare();
    }, [signer, account]);

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Add Liquidity</h2>

                {!signer ? (
                    <ConnectWallet />
                ) : (
                    <>
                        <input
                            className={styles.input}
                            placeholder="Token A"
                            value={tokenAAmount}
                            onChange={(e) => setTokenAAmount(e.target.value)}
                        />
                        <input
                            className={styles.input}
                            placeholder="Token B"
                            value={tokenBAmount}
                            onChange={(e) => setTokenBAmount(e.target.value)}
                        />

                        <button className={styles.button} onClick={handleAddLiquidity}>
                            Add Liquidity
                        </button>

                        <p className={styles.txStatus}>{txStatus}</p>
                        <p className={styles.userShare}>Your Pool Share: {userShare}%</p>
                    </>
                )}
            </div>
        </div>
    );
}
