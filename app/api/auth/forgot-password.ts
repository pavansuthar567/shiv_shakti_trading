import { NextRequest, NextResponse } from "next/server";
import { forgotPassword } from "@/app/services/auth";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const data = await forgotPassword(body);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
