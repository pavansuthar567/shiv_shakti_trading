import { NextResponse } from "next/server";
import { getProductCategories } from "@/app/services/productCategory";

export const GET = async () => {
  try {
    const categories = await getProductCategories();
    console.log("Fetched categories:", categories?.length);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Error fetching product categories" },
      { status: 500 },
    );
  }
};
