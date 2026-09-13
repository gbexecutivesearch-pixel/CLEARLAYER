"use client";

import { useAccount, useDisconnect } from "wagmi";
import ConnectButton from "./connect-button";
import styles from "./wallet.module.css";

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletPage() {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>CL</div>

          <p className={styles.eyebrow}>Wallet connection</p>

          <h1>
            {isConnected ? "Wallet connected" : "Connect your wallet"}
          </h1>

          <p className={styles.description}>
            {isConnected
              ? "Your wallet connection is active. Review the network and wallet details below."
              : "Connect a compatible wallet to continue through the secure payout process."}
          </p>

          <div className={styles.network}>
            <span
              className={
                chain?.id === 8453
                  ? styles.networkDot
                  : styles.networkDotWarning
              }
            />

            <div>
              <strong>
                {chain?.name ?? "Base network"}
              </strong>

              <span>
                {chain?.id === 8453
                  ? "Base network verified"
                  : "Switch to Base before continuing"}
              </span>
            </div>
          </div>

          {isConnected && address ? (
            <>
              <div className={styles.connected}>
                <div className={styles.check}>✓</div>

                <div>
                  <strong>{shortenAddress(address)}</strong>
                  <span>Wallet connection established.</span>
                </div>
              </div>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => disconnect()}
              >
                Disconnect wallet
              </button>
            </>
          ) : (
            <ConnectButton />
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
