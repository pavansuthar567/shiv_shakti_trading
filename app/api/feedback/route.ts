import { NextRequest, NextResponse } from "next/server";

// Mock data - replace with actual database calls
let feedbackData: any[] = [];
let feedbackId = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, userId, rating, comment, anonymous } = body;

    if (!productId || !userId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Invalid feedback data" },
        { status: 400 }
      );
    }

    const newFeedback = {
      _id: `feedback_${feedbackId++}`,
      productId,
      userId,
      rating,
      comment,
      anonymous,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    feedbackData.push(newFeedback);

    return NextResponse.json(
      { message: "Feedback submitted successfully", feedback: newFeedback },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const userId = searchParams.get("userId");

    if (productId) {
      const productFeedback = feedbackData.filter(f => f.productId === productId);
      return NextResponse.json({ feedback: productFeedback });
    }

    if (userId) {
      const userFeedback = feedbackData.filter(f => f.userId === userId);
      return NextResponse.json({ feedback: userFeedback });
    }

    return NextResponse.json({ feedback: feedbackData });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
