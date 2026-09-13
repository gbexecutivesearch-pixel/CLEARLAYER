"use client";

import { useAccount, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";
import styles from "./wallet.module.css";

export default function NetworkCheck() {
  const { isConnected, chain } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  if (!isConnected) {
    return null;
  }

  if (chain?.id === base.id) {
    return (
      <div className={styles.connected}>
        <div className={styles.check}>✓</div>

        <div>
          <strong>Base network verified</strong>
          <span>Your wallet is connected to Base.</span>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.button}
      disabled={isPending}
      onClick={() => switchChain({ chainId: base.id })}
    >
      {isPending ? "Switching network…" : "Switch to Base"}
      {!isPending && <span>→</span>}
    </button>
  );
            }
