"use client";

import { useConnect } from "wagmi";
import styles from "./wallet.module.css";

export default function ConnectButton() {
  const { connectors, connect, isPending } = useConnect();

  const connector = connectors[0];

  if (!connector) {
    return (
      <p style={{ color: "#f87171", fontSize: "12px" }}>
        No compatible wallet connector is available.
      </p>
    );
  }

  return (
    <button
      type="button"
      className={styles.button}
      disabled={isPending}
      onClick={() => connect({ connector })}
    >
      {isPending ? "Connecting…" : "Connect wallet"}
      {!isPending && <span>→</span>}
    </button>
  );
                 }
