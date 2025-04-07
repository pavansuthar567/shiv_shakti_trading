// import { NextRequest, NextResponse } from "next/server";
// import { login } from "@/app/services/auth";

// export const POST = async (req: NextRequest) => {
//   try {
//     const body = await req.json();
//     const data = await login(body);
//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("Login error:", err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };

import { NextRequest, NextResponse } from "next/server";
import { login } from "@/app/services/auth";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const data = await login(body);

    if (data?.error) {
      return NextResponse.json(
        { error: data.error },
        { status: data.status || 400 },
      );
    }

    return NextResponse.json(
      { message: "Login successful", data },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
