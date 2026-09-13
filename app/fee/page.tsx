import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import styles from "./fee.module.css";

export default async function FeePage() {
  const session = await getSession();

  if (!session) {
    redirect("/access");
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.icon}>$</div>

          <p className={styles.eyebrow}>
            Transaction review
          </p>

          <h1>Review processing fee</h1>

          <p className={styles.description}>
            Review the processing requirement below before
            deciding whether to authorize any transaction.
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

          <div className={styles.destination}>
            <span>Fee destination</span>

            <code>
              0x762143e94397497e5b13f232b324717243c9bfc9
            </code>
          </div>

          <div className={styles.notice}>
            <strong>Authorization required</strong>

            <p>
              No transaction will be submitted automatically.
              Your wallet will display the transaction details
              for your independent review and confirmation.
            </p>
          </div>

          <a
            href="/fee/authorize"
            className={styles.button}
          >
            Review authorization
            <span>→</span>
          </a>

          <a
            href="/wallet"
            className={styles.secondaryButton}
          >
            Back to wallet
          </a>

          <p className={styles.disclaimer}>
            The $2,000.00 payout remains pending and is not
            represented as settled until an actual payout
            transaction has been completed and verified.
          </p>
        </div>
      </section>
    </main>
  );
      }
