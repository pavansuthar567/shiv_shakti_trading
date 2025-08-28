import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, type = "general" } = body;

    if (!message) {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 }
      );
    }

    // Mock AI response - replace with actual AI service integration
    let aiResponse = "";
    
    switch (type) {
      case "general":
        aiResponse = "Thank you for your message! I'm here to help you with any questions about our products, sizes, or services. How can I assist you today?";
        break;
      case "recommendations":
        aiResponse = "Based on your preferences, I'd recommend checking out our cotton collection. We have various sizes available and the fabric is perfect for daily wear.";
        break;
      case "size-recommendations":
        aiResponse = "For the best fit, I recommend measuring your foot length. Our size chart shows that most customers find their perfect fit within our standard range. Would you like me to show you our size guide?";
        break;
      case "care-instructions":
        aiResponse = "To maintain the quality of your products, we recommend gentle washing in cold water and air drying. Avoid using bleach or fabric softeners.";
        break;
      case "shipping-info":
        aiResponse = "We offer free shipping on orders above ₹999. Standard delivery takes 3-5 business days. We also have express shipping available for faster delivery.";
        break;
      default:
        aiResponse = "I'm here to help! Please let me know if you have any specific questions about our products or services.";
    }

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      message: "AI response generated successfully",
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
