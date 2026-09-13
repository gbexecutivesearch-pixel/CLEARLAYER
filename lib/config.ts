const ACCESS_CODE = process.env.CLEARLAYER_ACCESS_CODE;
const SESSION_SECRET = process.env.CLEARLAYER_SESSION_SECRET;
const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const CLEARLAYER_CONFIG = {
  payout: {
    amountUsd: "2000.00",
    sender: "Mark Harrison",
    status: "Pending payout",
  },

  fee: {
    amountUsdc: "42.00",
    network: "Base",
    destination:
      "0x762143e94397497e5b13f232b324717243c9bfc9",
  },

  access: {
    code: ACCESS_CODE,
  },

  session: {
    secret: SESSION_SECRET,
  },

  wallet: {
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
  },
} as const;

export function validateServerConfig() {
  const missing: string[] = [];

  if (!ACCESS_CODE) {
    missing.push("CLEARLAYER_ACCESS_CODE");
  }

  if (!SESSION_SECRET) {
    missing.push("CLEARLAYER_SESSION_SECRET");
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}
