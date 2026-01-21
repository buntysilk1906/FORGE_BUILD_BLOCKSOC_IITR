"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import GetContracts from "../../utils/contract";
import ConnectWallet from "../../utils/wallet";
import { useWallet } from "../../components/WalletContext";
import styles from "../../styles/swap.module.css";

export default function Swap() {
    const { signer } = useWallet();
    const [Amm, setAmm] = useState(null);
    const [amountIn, setAmountIn] = useState("");
    const [expectedOut, setExpectedOut] = useState({ aToB: "0", bToA: "0" });
    const [txStatus, setTxStatus] = useState("");

    useEffect(() => {
        if (!signer) return;


        async function init() {
            const { Amm } = await GetContracts(signer);
            setAmm(Amm);
        }
        init();
    }, [signer]);

    useEffect(() => {
        if (!Amm || !amountIn) return;

        async function calcExpected() {
            try {
                const [reserveA, reserveB] = await Amm.getReserve();
                const amountWei = ethers.parseEther(amountIn);
                const amountInWithFee = (amountWei * 997n) / 1000n;

                const aToB = (amountInWithFee * BigInt(reserveB.toString())) / (BigInt(reserveA.toString()) + amountInWithFee);
                const bToA = (amountInWithFee * BigInt(reserveA.toString())) / (BigInt(reserveB.toString()) + amountInWithFee);

                setExpectedOut({
                    aToB: ethers.formatEther(aToB),
                    bToA: ethers.formatEther(bToA),
                });
            } catch (err) {
                console.error(err);
            }
        }

        calcExpected();
    }, [amountIn, Amm]);

    const handleSwapAtoB = async () => {
        if (!Amm || !signer) return;
        const { tokenA } = await GetContracts(signer);
        const amountWei = ethers.parseEther(amountIn);
        await tokenA.approve(Amm.target, amountWei);
        const tx = await Amm.swapAforB(amountWei, 0);
        await tx.wait();
        setTxStatus(`Swap A → B successful! Estimated: ${expectedOut.aToB} B`);
    };

    const handleSwapBtoA = async () => {
        if (!Amm || !signer) return;
        const { tokenB } = await GetContracts(signer);
        const amountWei = ethers.parseEther(amountIn);
        await tokenB.approve(Amm.target, amountWei);
        const tx = await Amm.swapBforA(amountWei, 0);
        await tx.wait();
        setTxStatus(`Swap B → A successful! Estimated: ${expectedOut.bToA} A`);
    };

    if (!signer) return <ConnectWallet label="Connect Wallet" />;

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Swap Tokens</h2>

                {!signer ? (
                    <ConnectWallet label="Connect Wallet" />
                ) : (
                    <>
                        <input
                            className={styles.input}
                            placeholder="Amount"
                            value={amountIn}
                            onChange={(e) => setAmountIn(e.target.value)}
                        />

                        <p className={styles.estimated}>Estimated A → B: {expectedOut.aToB}</p>
                        <p className={styles.estimated}>Estimated B → A: {expectedOut.bToA}</p>

                        <button className={styles.button} onClick={handleSwapAtoB}>
                            Swap A → B
                        </button>
                        <button className={styles.button} onClick={handleSwapBtoA}>
                            Swap B → A
                        </button>

                        <p className={styles.txStatus}>{txStatus}</p>
                    </>
                )}
            </div>
        </div>
    );
}
