export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-xl font-bold text-blue-400 ring-1 ring-blue-400/20">
            CL
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            ClearLayer
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Secure Payout Portal
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Your secure payout session is ready. Continue to access your
            payout details.
          </p>

          <button
            type="button"
            className="mt-8 w-full rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98]"
          >
            Access Your Payout
          </button>

          <p className="mt-5 text-xs text-slate-500">
            Securely processed by ClearLayer
          </p>
        </div>
      </section>
    </main>
  );
      }
