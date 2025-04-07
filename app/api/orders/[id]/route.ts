import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrder, deleteOrder } from "@/app/services/order";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const order = await getOrderById(params.id);

    if (order?.error) {
      return NextResponse.json(
        { error: order.error },
        { status: order.status || 400 },
      );
    }
    return NextResponse.json(
      { message: "Order", data: order },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const body = await req.json();
    const updated = await updateOrder(params.id, body);

    if (updated?.error) {
      return NextResponse.json(
        { error: updated.error },
        { status: updated.status || 400 },
      );
    }

    return NextResponse.json(
      { message: "Order updated successfully", data: updated },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const deleted = await deleteOrder(params.id);

    if (deleted?.error) {
      return NextResponse.json(
        { error: deleted.error },
        { status: deleted.status || 400 },
      );
    }

    return NextResponse.json(
      { message: "Order Deleted Successfully", deleted },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
