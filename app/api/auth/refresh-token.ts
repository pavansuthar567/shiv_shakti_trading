import { NextRequest, NextResponse } from "next/server";
import { refreshToken } from "@/app/services/auth";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const data = await refreshToken(body);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Refresh token error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
