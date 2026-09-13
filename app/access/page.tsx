"use client";

import { FormEvent, useState } from "react";
import styles from "./access.module.css";

export default function AccessPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Enter your full name.");
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError("Enter your 6-digit access code.");
      return;
    }

    if (code !== "123425") {
      setError("The access code is not valid.");
      return;
    }

    setError("");
    window.location.href = "/payout";
  }

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.logo}>CL</div>

          <p className={styles.eyebrow}>ClearLayer</p>

          <h1>Access Your Payout</h1>

          <p className={styles.description}>
            Enter the details provided to you to securely access your payout
            portal.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              <span>Recipient name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </label>

            <label>
              <span>6-digit access code</span>
              <input
                type="password"
                value={code}
                onChange={(event) =>
                  setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter access code"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
              />
            </label>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button type="submit" className={styles.button}>
              Continue securely
            </button>
          </form>

          <p className={styles.footer}>
            Your access session is protected by ClearLayer.
          </p>
        </div>
      </section>
    </main>
  );
                        }
