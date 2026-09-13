import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import styles from "./continue.module.css";

export default async function ContinuePage() {
  const session = await getSession();

  if (!session) {
    redirect("/access");
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.icon}>✓</div>

          <p className={styles.eyebrow}>Next step</p>

          <h1>Continue securely</h1>

          <p className={styles.description}>
            Your payout details are ready for review. The next
            step is to connect a compatible wallet so you can
            review the required processing fee before any
            transaction is authorized.
          </p>

          <div className={styles.summary}>
            <div>
              <span>Recipient</span>
              <strong>{session.recipientName}</strong>
            </div>

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

          <a
            href="/wallet"
            className={styles.button}
          >
            Connect wallet
            <span>→</span>
          </a>

          <p className={styles.note}>
            Connecting a wallet does not authorize or send the
            processing fee. Any transaction requires a separate
            review and confirmation in your wallet.
          </p>
        </div>
      </section>
    </main>
  );
              }
