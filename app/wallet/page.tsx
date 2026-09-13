"use client";

import { useState } from "react";
import styles from "./wallet.module.css";

export default function WalletPage() {
  const [connected, setConnected] = useState(false);

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>CL</div>

          <p className={styles.eyebrow}>Wallet connection</p>

          <h1>Connect your wallet</h1>

          <p className={styles.description}>
            Connect a compatible wallet to view your wallet information and
            continue through the secure payout process.
          </p>

          <div className={styles.network}>
            <span className={styles.networkDot} />
            <div>
              <strong>Base network</strong>
              <span>Ethereum-compatible network</span>
            </div>
          </div>

          {!connected ? (
            <button
              type="button"
              className={styles.button}
              onClick={() => setConnected(true)}
            >
              Connect wallet
              <span>→</span>
            </button>
          ) : (
            <div className={styles.connected}>
              <div className={styles.check}>✓</div>

              <div>
                <strong>Wallet connected</strong>
                <span>Connection established successfully.</span>
              </div>
            </div>
          )}

          <p className={styles.disclaimer}>
            Connecting a wallet does not authorize a payment or transfer.
            Any transaction must be separately reviewed and confirmed by you.
          </p>
        </div>
      </section>
    </main>
  );
    }
