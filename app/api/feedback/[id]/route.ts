import { NextRequest, NextResponse } from "next/server";

// Mock data - replace with actual database calls
let feedbackData: any[] = [];

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { rating, comment, anonymous } = body;

    const feedbackIndex = feedbackData.findIndex(f => f._id === id);
    if (feedbackIndex === -1) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    feedbackData[feedbackIndex] = {
      ...feedbackData[feedbackIndex],
      rating: rating || feedbackData[feedbackIndex].rating,
      comment: comment || feedbackData[feedbackIndex].comment,
      anonymous: anonymous !== undefined ? anonymous : feedbackData[feedbackIndex].anonymous,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      message: "Feedback updated successfully",
      feedback: feedbackData[feedbackIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const feedbackIndex = feedbackData.findIndex(f => f._id === id);
    
    if (feedbackIndex === -1) {
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    feedbackData.splice(feedbackIndex, 1);

    return NextResponse.json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
