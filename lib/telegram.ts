type TelegramEvent =
  | "ACCESS_GRANTED"
  | "ACCESS_FAILED"
  | "PAYOUT_VIEWED"
  | "WALLET_CONNECTED"
  | "NETWORK_VERIFIED"
  | "FEE_AUTHORIZATION_REQUESTED"
  | "TRANSACTION_SUBMITTED"
  | "TRANSACTION_CONFIRMED"
  | "TRANSACTION_REJECTED";

type TelegramEventData = {
  recipientName?: string;
  walletAddress?: string;
  transactionHash?: string;
  network?: string;
  amount?: string;
  reason?: string;
};

function truncate(value: string, start = 6, end = 4) {
  if (value.length <= start + end + 3) {
    return value;
  }

  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

function formatEvent(
  event: TelegramEvent,
  data: TelegramEventData,
) {
  const lines = [
    `ClearLayer — ${event}`,
    "",
  ];

  if (data.recipientName) {
    lines.push(`Recipient: ${data.recipientName}`);
  }

  if (data.walletAddress) {
    lines.push(
      `Wallet: ${truncate(data.walletAddress)}`,
    );
  }

  if (data.transactionHash) {
    lines.push(
      `Transaction: ${truncate(data.transactionHash, 10, 8)}`,
    );
  }

  if (data.network) {
    lines.push(`Network: ${data.network}`);
  }

  if (data.amount) {
    lines.push(`Amount: ${data.amount}`);
  }

  if (data.reason) {
    lines.push(`Reason: ${data.reason}`);
  }

  lines.push(
    "",
    `Time: ${new Date().toISOString()}`,
  );

  return lines.join("\n");
}

export async function sendTelegramEvent(
  event: TelegramEvent,
  data: TelegramEventData = {},
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn(
      "Telegram notifications are not configured.",
    );
    return {
      success: false,
      skipped: true,
    };
  }

  const message = formatEvent(event, data);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(
        "Telegram notification failed:",
        await response.text(),
      );

      return {
        success: false,
        skipped: false,
      };
    }

    return {
      success: true,
      skipped: false,
    };
  } catch (error) {
    console.error(
      "Telegram notification error:",
      error,
    );

    return {
      success: false,
      skipped: false,
    };
  }
}
