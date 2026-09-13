import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.logo}>CL</div>

        <h1 className={styles.title}>ClearLayer</h1>

        <p className={styles.description}>
          Preparing your secure payout session…
        </p>

        <div className={styles.progress} aria-hidden="true">
          <div className={styles.progressBar} />
        </div>
      </div>
    </main>
  );
}
