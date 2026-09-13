import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import styles from "./authorize.module.css";

export default async function AuthorizeFeePage() {
  const session = await getSession();

  if (!session) {
    redirect("/access");
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.icon}>✓</div>

          <p className={styles.eyebrow}>
            Final review
          </p>

          <h1>Authorize processing fee</h1>

          <p className={styles.description}>
            Review the transaction details below. Your wallet
            will be asked to approve the transaction separately.
          </p>

          <div className={styles.amount}>
            <span>Amount</span>
            <strong>$42.00 USDC</strong>
          </div>

          <div className={styles.details}>
            <div>
              <span>Recipient</span>
              <strong>{session.recipientName}</strong>
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

          <div className={styles.notice}>
            <strong>Nothing is submitted automatically.</strong>

            <p>
              Selecting the button below only opens the wallet
              transaction request. Review the amount, token,
              network, and destination inside your wallet before
              confirming.
            </p>
          </div>

          <a
            href="/fee/authorize/confirm"
            className={styles.button}
          >
            Open wallet authorization
            <span>→</span>
          </a>

          <a
            href="/fee"
            className={styles.secondaryButton}
          >
            Back to fee review
          </a>

          <p className={styles.disclaimer}>
            The $2,000.00 payout remains pending. A processing-fee
            authorization does not represent completion or
            settlement of the payout.
          </p>
        </div>
      </section>
    </main>
  );
          }
