import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/app/services/product";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    // const category = request.nextUrl.searchParams.get("category"); // Use `nextUrl`
    // if (!category)
    //   return NextResponse.json(
    //     { message: "Category required" },
    //     { status: 400 },
    //   );

    console.log("Received category:", category);

    const products = await getProducts({ category });
    console.log("Fetched products:", products?.length);

    return NextResponse.json(products);
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 },
    );
  }
};
