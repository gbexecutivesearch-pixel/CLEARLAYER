export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-lg font-bold text-blue-400 ring-1 ring-blue-400/20">
          CL
        </div>

        <h1 className="text-lg font-semibold text-white">
          ClearLayer
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Preparing your secure payout session…
        </p>

        <div className="mx-auto mt-6 h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500" />
        </div>
      </div>
    </main>
  );
        }
