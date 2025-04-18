import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders } from "@/app/services/order";

export const GET = async (_: NextRequest) => {
  try {
    const orders = await getOrders(); // Fetch by userId internally

    if (orders?.error) {
      return NextResponse.json(
        { error: orders.error },
        { status: orders.status || 400 },
      );
    }

    return NextResponse.json(
      { message: "Orders", data: orders },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    // Get the cookies from the request
    const cookies = req.cookies;
    const token = cookies.get("token"); // Get the token from the cookies

    if (!token?.value) {
      return NextResponse.json(
        { error: "Token expired. Please sign in again." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const created = await createOrder(body, token?.value);

    if (created?.error) {
      return NextResponse.json(
        { error: created.error },
        { status: created.status || 400 },
      );
    }

    return NextResponse.json(
      { message: "Order created successfully", data: created },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
