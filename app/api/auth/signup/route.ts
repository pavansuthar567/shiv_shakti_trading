import { NextRequest, NextResponse } from "next/server";
import { register } from "@/app/services/auth";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const data = await register(body);

    if (data?.error) {
      return NextResponse.json(
        { error: data.error },
        { status: data.status || 400 },
      );
    }

    return NextResponse.json(
      { message: "Registered successfully", data },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
