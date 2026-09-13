"use client";

import { useAccount, useDisconnect } from "wagmi";
import ConnectButton from "./connect-button";
import NetworkCheck from "./network-check";
import styles from "./wallet.module.css";

type WalletClientProps = {
  recipientName: string;
};

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletClient({
  recipientName,
}: WalletClientProps) {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();

  const isBase = chain?.id === 8453;

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>CL</div>

          <p className={styles.eyebrow}>Wallet connection</p>

          <h1>
            {isConnected
              ? "Wallet connected"
              : "Connect your wallet"}
          </h1>

          <p className={styles.description}>
            {isConnected
              ? `Welcome, ${recipientName}. Review your wallet and network before continuing.`
              : "Connect a compatible wallet to continue through the secure payout process."}
          </p>

          <div className={styles.network}>
            <span
              className={
                isBase
                  ? styles.networkDot
                  : styles.networkDotWarning
              }
            />

            <div>
              <strong>
                {isConnected
                  ? chain?.name ?? "Unknown network"
                  : "Base network"}
              </strong>

              <span>
                {isBase
                  ? "Base network verified"
                  : "Base is required to continue"}
              </span>
            </div>
          </div>

          {isConnected && address ? (
            <>
              <div className={styles.connected}>
                <div className={styles.check}>✓</div>

                <div>
                  <strong>{shortenAddress(address)}</strong>
                  <span>
                    Wallet connection established.
                  </span>
                </div>
              </div>

              <NetworkCheck />

              {isBase && (
                <a
                  href="/fee"
                  className={styles.button}
                >
                  Review processing fee
                  <span>→</span>
                </a>
              )}

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
            Connecting a wallet does not authorize a payment or
            transfer. Any transaction must be separately reviewed
            and confirmed by you.
          </p>
        </div>
      </section>
    </main>
  );
                }
