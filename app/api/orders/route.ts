import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrders } from "@/app/services/order";

export const GET = async (_: NextRequest) => {
  try {
    const orders = await getOrders(); // Fetch by userId internally
    console.log("orders", orders);

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
    const body = await req.json();
    const created = await createOrder(body);

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
