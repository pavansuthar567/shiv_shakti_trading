import { NextRequest, NextResponse } from "next/server";
import { logout } from "@/app/services/auth";

export const POST = async (req: NextRequest) => {
  try {
    const data = await logout();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
