import { NextResponse } from "next/server";
import {
  recordAuditEvent,
  type AuditData,
  type AuditEvent,
} from "@/lib/audit";

const ALLOWED_EVENTS: AuditEvent[] = [
  "ACCESS_GRANTED",
  "ACCESS_FAILED",
  "PAYOUT_VIEWED",
  "WALLET_CONNECTED",
  "NETWORK_VERIFIED",
  "FEE_AUTHORIZATION_REQUESTED",
  "TRANSACTION_SUBMITTED",
  "TRANSACTION_CONFIRMED",
  "TRANSACTION_REJECTED",
];

function isAuditEvent(
  value: unknown,
): value is AuditEvent {
  return (
    typeof value === "string" &&
    ALLOWED_EVENTS.includes(value as AuditEvent)
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!isAuditEvent(body.event)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid audit event.",
        },
        { status: 400 },
      );
    }

    const data: AuditData =
      body.data &&
      typeof body.data === "object" &&
      !Array.isArray(body.data)
        ? body.data
        : {};

    const record = await recordAuditEvent(
      body.event,
      data,
    );

    return NextResponse.json({
      success: true,
      event: record.event,
      timestamp: record.timestamp,
    });
  } catch (error) {
    console.error(
      "Audit API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to record audit event.",
      },
      { status: 500 },
    );
  }
  }
