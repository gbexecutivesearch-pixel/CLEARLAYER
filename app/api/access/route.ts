import { NextResponse } from "next/server";

const ACCESS_CODE = process.env.CLEARLAYER_ACCESS_CODE;

export async function POST(request: Request) {
  try {
    if (!ACCESS_CODE) {
      console.error("CLEARLAYER_ACCESS_CODE is not configured.");

      return NextResponse.json(
        {
          success: false,
          message: "Access service is not configured.",
        },
        { status: 500 },
      );
    }

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const code =
      typeof body.code === "string"
        ? body.code.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter your full name.",
        },
        { status: 400 },
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter your 6-digit access code.",
        },
        { status: 400 },
      );
    }

    if (code !== ACCESS_CODE) {
      return NextResponse.json(
        {
          success: false,
          message: "The access code is not valid.",
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      recipientName: name,
    });
  } catch (error) {
    console.error("Access verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to verify access at this time.",
      },
      { status: 500 },
    );
  }
        }
