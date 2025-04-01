import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/app/services/product";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const product = await getProductById(params.id);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
};
