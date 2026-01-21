"use client";

import { useEffect } from "react";
import { ethers } from "ethers";
import ConnectWallet from "../utils/wallet";
import GetContracts from "../utils/contract";
import { useWallet } from "../components/WalletContext";
import styles from "../styles/home.module.css";

export default function Home() {
  const { signer, setSigner, account, setAccount, reserves, setReserves } = useWallet();

  const fetchReserves = async (s) => {
    if (!s) return;
    try {
      const { Amm } = await GetContracts(s);
      const [reserveA, reserveB] = await Amm.getReserve();
      setReserves({
        a: ethers.formatEther(reserveA),
        b: ethers.formatEther(reserveB),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleConnect = async () => {
    if (!window.ethereum) return alert("MetaMask not installed!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const s = await provider.getSigner();
    const addr = await s.getAddress();
    setSigner(s);
    setAccount(addr);
    fetchReserves(s);
  };

  useEffect(() => {
    if (signer) fetchReserves(signer);
  }, [signer]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.heading}>AMM Reserves</h2>
        <ConnectWallet
          className={styles.connectButton}
          label="Connect Wallet"
          onClick={handleConnect}
        />
        <div className={styles.reserves}>
          <p>Reserve A: {reserves.a ?? "0"}</p>
          <p>Reserve B: {reserves.b ?? "0"}</p>
        </div>
      </div>
    </div>
  );

}
