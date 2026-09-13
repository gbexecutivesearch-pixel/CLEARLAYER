import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "clearlayer_session";
const SESSION_MAX_AGE = 60 * 60;

type SessionPayload = {
  recipientName: string;
  createdAt: number;
};

function getSessionSecret() {
  const secret = process.env.CLEARLAYER_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "CLEARLAYER_SESSION_SECRET is not configured.",
    );
  }

  return secret;
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
}

function createSignature(payload: string) {
  return createHmac(
    "sha256",
    getSessionSecret(),
  )
    .update(payload)
    .digest("base64url");
}

export function createSessionToken(
  recipientName: string,
) {
  const payload = encodePayload({
    recipientName,
    createdAt: Date.now(),
  });

  const signature = createSignature(payload);

  return `${payload}.${signature}`;
}

export function verifySessionToken(
  token: string,
): SessionPayload | null {
  try {
    const separator = token.lastIndexOf(".");

    if (separator === -1) {
      return null;
    }

    const payload = token.slice(0, separator);
    const signature = token.slice(separator + 1);

    const expectedSignature = createSignature(payload);

    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      actualBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(
        actualBuffer,
        expectedBuffer,
      )
    ) {
      return null;
    }

    const decoded = Buffer.from(
      payload,
      "base64url",
    ).toString("utf8");

    const session = JSON.parse(
      decoded,
    ) as SessionPayload;

    if (
      typeof session.recipientName !== "string" ||
      !session.recipientName.trim() ||
      typeof session.createdAt !== "number" ||
      !Number.isFinite(session.createdAt)
    ) {
      return null;
    }

    const age =
      Date.now() - session.createdAt;

    if (
      age < 0 ||
      age > SESSION_MAX_AGE * 1000
    ) {
      return null;
    }

    return {
      recipientName: session.recipientName.trim(),
      createdAt: session.createdAt,
    };
  } catch {
    return null;
  }
}

export async function setSession(
  recipientName: string,
) {
  const cookieStore = await cookies();

  cookieStore.set(
    SESSION_COOKIE,
    createSessionToken(recipientName),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    },
  );
}

export async function getSession() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = verifySessionToken(token);

  if (!session) {
    await clearSession();
    return null;
  }

  return session;
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.set(
    SESSION_COOKIE,
    "",
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    },
  );
    }
