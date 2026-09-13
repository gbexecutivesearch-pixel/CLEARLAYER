import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import styles from "./confirm.module.css";

export default async function ConfirmFeePage() {
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
            Wallet authorization
          </p>

          <h1>Confirm transaction details</h1>

          <p className={styles.description}>
            Carefully review the transaction below before
            continuing to your wallet.
          </p>

          <div className={styles.amount}>
            <span>Transaction amount</span>
            <strong>$42.00 USDC</strong>
          </div>

          <div className={styles.details}>
            <div>
              <span>Recipient</span>
              <strong>{session.recipientName}</strong>
            </div>

            <div>
              <span>Token</span>
              <strong>USDC</strong>
            </div>

            <div>
              <span>Network</span>
              <strong>Base</strong>
            </div>

            <div>
              <span>Destination</span>
              <code>
                0x762143e94397497e5b13f232b324717243c9bfc9
              </code>
            </div>
          </div>

          <div className={styles.warning}>
            <strong>Review this in your wallet</strong>

            <p>
              Your wallet is the final authority for transaction
              approval. Verify the token, amount, network, and
              destination address before confirming.
            </p>
          </div>

          <a
            href="/wallet"
            className={styles.button}
          >
            Return to wallet
            <span>→</span>
          </a>

          <a
            href="/fee/authorize"
            className={styles.secondaryButton}
          >
            Back to authorization
          </a>

          <p className={styles.disclaimer}>
            No transaction has been submitted from this page.
            The $2,000.00 payout remains pending until its actual
            settlement transaction is completed and verified.
          </p>
        </div>
      </section>
    </main>
  );
        }
