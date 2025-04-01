import { NextRequest, NextResponse } from "next/server";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/app/services/cart"; // Adjust the import path as necessary

export const GET = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get("userId"); // Assuming userId is passed as a query parameter
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }

  try {
    const cart = await getCart(userId);
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { message: "Error fetching cart" },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get("userId"); // Assuming userId is passed as a query parameter
  const itemData = await request.json();

  if (!userId || !itemData) {
    return NextResponse.json(
      { message: "User ID and item data are required" },
      { status: 400 },
    );
  }

  try {
    const cart = await addToCart(userId, itemData);
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "Error adding item to cart" },
      { status: 500 },
    );
  }
};

export const PUT = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get("userId"); // Assuming userId is passed as a query parameter
  const updateData = await request.json();

  if (!userId || !updateData) {
    return NextResponse.json(
      { message: "User ID and update data are required" },
      { status: 400 },
    );
  }

  try {
    const cart = await updateCart(userId, updateData);
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { message: "Error updating cart" },
      { status: 500 },
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get("userId"); // Assuming userId is passed as a query parameter
  const productId = request.nextUrl.searchParams.get("productId"); // Assuming productId is passed as a query parameter

  if (!userId || !productId) {
    return NextResponse.json(
      { message: "User ID and product ID are required" },
      { status: 400 },
    );
  }

  try {
    const cart = await removeFromCart(userId, productId);
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { message: "Error removing item from cart" },
      { status: 500 },
    );
  }
};

export const CLEAR = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get("userId"); // Assuming userId is passed as a query parameter

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }

  try {
    await clearCart(userId);
    return NextResponse.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { message: "Error clearing cart" },
      { status: 500 },
    );
  }
};
