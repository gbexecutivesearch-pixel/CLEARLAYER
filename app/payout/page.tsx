import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import styles from "./payout.module.css";

export default async function PayoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/access");
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <div className={styles.logo}>CL</div>
            <span>ClearLayer</span>
          </div>

          <div className={styles.secure}>
            <span className={styles.dot} />
            Secure session
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.welcome}>
            <p className={styles.eyebrow}>Payout overview</p>

            <h1>
              Welcome, <span>{session.recipientName}</span>
            </h1>

            <p>
              Review your payout details and the current processing
              requirement below.
            </p>
          </div>

          <div className={styles.payoutCard}>
            <div className={styles.cardTop}>
              <span>Payout amount</span>

              <span className={styles.status}>
                <span />
                Pending payout
              </span>
            </div>

            <div className={styles.amount}>$2,000.00</div>

            <div className={styles.sender}>
              <span>From</span>
              <strong>Mark Harrison</strong>
            </div>
          </div>

          <div className={styles.details}>
            <div>
              <span>Processing fee</span>
              <strong>$42.00 USDC</strong>
            </div>

            <div>
              <span>Network</span>
              <strong>Base</strong>
            </div>

            <div>
              <span>Current status</span>
              <strong className={styles.pending}>
                Pending payout
              </strong>
            </div>
          </div>

          <div className={styles.notice}>
            <div className={styles.noticeIcon}>i</div>

            <div>
              <strong>Processing requirement</strong>

              <p>
                A $42.00 USDC processing fee on Base is required
                before the payout can proceed.
              </p>
            </div>
          </div>

          <a
            href="/payout/continue"
            className={styles.button}
          >
            Continue securely
            <span>→</span>
          </a>

          <p className={styles.disclaimer}>
            The $2,000.00 payout remains pending until an actual
            settlement transaction has been completed and verified.
          </p>
        </div>
      </section>
    </main>
  );
                                   }
