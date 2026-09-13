"use client";

import { FormEvent, useState } from "react";
import styles from "./access.module.css";

export default function AccessPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Enter your full name.");
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError("Enter your 6-digit access code.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          code,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(
          typeof result.message === "string"
            ? result.message
            : "Unable to verify access.",
        );
        return;
      }

      const recipientName =
        typeof result.recipientName === "string"
          ? result.recipientName
          : name.trim();

      sessionStorage.setItem(
        "clearlayer_recipient_name",
        recipientName,
      );

      window.location.href = "/payout";
    } catch {
      setError(
        "Unable to connect to the secure access service. Please try again.",
      );
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
              />
            </label>

            <label>
              <span>6-digit access code</span>

              <input
                type="password"
                value={code}
                onChange={(event) =>
                  setCode(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6),
                  )
                }
                placeholder="Enter access code"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                disabled={loading}
              />
            </label>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? "Verifying securely…" : "Continue securely"}
            </button>
          </form>

          <p className={styles.footer}>
            Your access session is protected by ClearLayer.
          </p>
        </div>
      </section>
    </main>
  );
    }          <p className={styles.description}>
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
                disabled={loading}
              />
            </label>

            <label>
              <span>6-digit access code</span>

              <input
                type="password"
                value={code}
                onChange={(event) =>
                  setCode(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6),
                  )
                }
                placeholder="Enter access code"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                disabled={loading}
              />
            </label>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? "Verifying securely…" : "Continue securely"}
            </button>
          </form>

          <p className={styles.footer}>
            Your access session is protected by ClearLayer.
          </p>
        </div>
      </section>
    </main>
  );
        }              Continue securely
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
