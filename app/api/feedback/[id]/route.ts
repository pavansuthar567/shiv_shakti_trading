import { feedbackService } from "@/app/services/feedback";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    // Get the cookies from the request
    const cookies = req.cookies;
    const token = cookies.get("token"); // Get the token from the cookies

    if (!token?.value) {
      return NextResponse.json(
        { message: "Token expired. Please sign in again." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const updated = await feedbackService.updateFeedback(
      params.id,
      body,
      token.value,
    );

    if (updated?.error) {
      return NextResponse.json(
        { error: updated.error },
        { status: updated.status || 400 },
      );
    }

    return NextResponse.json(
      { message: "Feedback updated successfully", data: updated },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    // Get the cookies from the request
    const cookies = _.cookies;
    const token = cookies.get("token"); // Get the token from the cookies

    if (!token?.value) {
      return NextResponse.json(
        { message: "Token expired. Please sign in again." },
        { status: 401 },
      );
    }

    const deleted = await feedbackService.deleteFeedback(
      params.id,
      token.value,
    );

    if (deleted?.error) {
      return NextResponse.json(
        { error: deleted.error },
        { status: deleted.status || 400 },
      );
    }

    return NextResponse.json(
      { message: "Feedback Deleted Successfully", deleted },
      { status: 200 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
