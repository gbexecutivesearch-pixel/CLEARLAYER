import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>CL</div>

          <p className={styles.eyebrow}>ClearLayer</p>

          <h1>Secure Payout Portal</h1>

          <p className={styles.description}>
            Your secure payout session is ready. Continue to
            access your payout details.
          </p>

          <Link
            href="/access"
            className={styles.button}
          >
            Access Your Payout
          </Link>

          <p className={styles.footer}>
            Securely processed by ClearLayer
          </p>
        </div>
      </section>
    </main>
  );
}
