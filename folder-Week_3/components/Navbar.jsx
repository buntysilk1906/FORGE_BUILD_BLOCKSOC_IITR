"use client";

import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            { }
            <div className={styles.inner}>
                <div className={styles.logoText}>
                    <Link href="/">AMM</Link>
                </div>

                { }
                <ul className={styles.navLinks}>
                    <li>
                        <Link href="/addLiquidity" className={styles.navItem}>
                            Add Liquidity
                        </Link>
                    </li>
                    <li>
                        <Link href="/WithdrawLiquidity" className={styles.navItem}>
                            Withdraw
                        </Link>
                    </li>
                    <li>
                        <Link href="/swap" className={styles.navItem}>
                            Swap
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
