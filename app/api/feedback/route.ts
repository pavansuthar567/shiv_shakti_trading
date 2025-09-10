import { feedbackService } from "@/app/services/feedback";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get the cookies from the request
    const cookies = request.cookies;
    const token = cookies.get("token"); // Get the token from the cookies

    if (!token?.value) {
      return NextResponse.json(
        { message: "Token expired. Please sign in again." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { productId, rating, comment, anonymous } = body;

    console.log("body", body);

    if (!productId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Invalid feedback data" },
        { status: 400 },
      );
    }

    const result = await feedbackService.submitFeedback(body, token.value);

    if (result?.error) {
      return NextResponse.json(
        { message: result.error },
        { status: result.status || 400 },
      );
    }

    return NextResponse.json(
      { message: "Feedback submitted successfully", feedback: result },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const userId = searchParams.get("userId");

    let result;

    if (productId) {
      result = await feedbackService.getProductFeedback(productId);
    } else if (userId) {
      // For user feedback, we need authentication token
      const cookies = request.cookies;
      const token = cookies.get("token");

      if (!token?.value) {
        return NextResponse.json(
          { message: "Token expired. Please sign in again." },
          { status: 401 },
        );
      }

      result = await feedbackService.getUserFeedback(token.value);
    } else {
      return NextResponse.json(
        { message: "productId or userId parameter is required" },
        { status: 400 },
      );
    }

    if (result?.error) {
      return NextResponse.json(
        { message: result.error },
        { status: result.status || 400 },
      );
    }

    return NextResponse.json({ feedback: result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
