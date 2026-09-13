export type AuditEvent =
  | "ACCESS_GRANTED"
  | "ACCESS_FAILED"
  | "PAYOUT_VIEWED"
  | "WALLET_CONNECTED"
  | "NETWORK_VERIFIED"
  | "FEE_AUTHORIZATION_REQUESTED"
  | "TRANSACTION_SUBMITTED"
  | "TRANSACTION_CONFIRMED"
  | "TRANSACTION_REJECTED";

export type AuditData = {
  recipientName?: string;
  walletAddress?: string;
  transactionHash?: string;
  network?: string;
  amount?: string;
  reason?: string;
};

export type AuditRecord = {
  event: AuditEvent;
  timestamp: string;
  data: AuditData;
};

function truncateAddress(value: string) {
  if (value.length <= 12) {
    return value;
  }

  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function sanitizeData(data: AuditData): AuditData {
  return {
    ...data,
    walletAddress: data.walletAddress
      ? truncateAddress(data.walletAddress)
      : undefined,
    transactionHash: data.transactionHash
      ? truncateAddress(data.transactionHash)
      : undefined,
  };
}

/**
 * Central audit-event entry point.
 *
 * For now this writes structured events to the server log.
 * A later database layer can persist the same records without
 * changing the calling code throughout the application.
 */
export async function recordAuditEvent(
  event: AuditEvent,
  data: AuditData = {},
) {
  const record: AuditRecord = {
    event,
    timestamp: new Date().toISOString(),
    data: sanitizeData(data),
  };

  console.info(
    "[ClearLayer Audit]",
    JSON.stringify(record),
  );

  return record;
}
