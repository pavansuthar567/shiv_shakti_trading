import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/app/services/auth";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const data = await resetPassword(body);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
