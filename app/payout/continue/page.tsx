"use client";

import { useState } from "react";
import styles from "./continue.module.css";

export default function ContinuePage() {
  const [loading, setLoading] = useState(false);

  function handleContinue() {
    setLoading(true);

    window.setTimeout(() => {
      window.location.href = "/wallet";
    }, 500);
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.icon}>✓</div>

          <p className={styles.eyebrow}>Next step</p>

          <h1>Continue securely</h1>

          <p className={styles.description}>
            Your payout details have been reviewed. The next step is to
            connect a compatible wallet so the required processing fee can be
            authorized.
          </p>

          <div className={styles.summary}>
            <div>
              <span>Payout</span>
              <strong>$2,000.00</strong>
            </div>

            <div>
              <span>Processing fee</span>
              <strong>$42.00 USDC</strong>
            </div>

            <div>
              <span>Network</span>
              <strong>Base</strong>
            </div>
          </div>

          <button
            type="button"
            className={styles.button}
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Preparing secure connection…" : "Connect wallet"}
            {!loading && <span>→</span>}
          </button>

          <p className={styles.note}>
            Connecting a wallet does not authorize or send the processing fee.
            Any transaction requires a separate confirmation in your wallet.
          </p>
        </div>
      </section>
    </main>
  );
}
