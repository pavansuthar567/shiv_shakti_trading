import { NextRequest, NextResponse } from "next/server";

// Mock data - replace with actual database calls
let subscriptionPlans: any[] = [
  {
    _id: "plan_1",
    name: "Weekly Essentials",
    duration: "weekly",
    price: 299,
    features: ["Weekly product delivery", "Priority customer support", "Exclusive discounts"],
    isActive: true,
  },
  {
    _id: "plan_2",
    name: "Monthly Premium",
    duration: "monthly",
    price: 999,
    features: ["Monthly product delivery", "Premium customer support", "Exclusive discounts", "Free shipping"],
    isActive: true,
  },
];

let userSubscriptions: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, planId } = body;

    if (!userId || !planId) {
      return NextResponse.json(
        { message: "User ID and plan ID are required" },
        { status: 400 }
      );
    }

    const plan = subscriptionPlans.find(p => p._id === planId);
    if (!plan) {
      return NextResponse.json(
        { message: "Plan not found" },
        { status: 404 }
      );
    }

    const startDate = new Date();
    const endDate = new Date();
    if (plan.duration === "weekly") {
      endDate.setDate(endDate.getDate() + 7);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const newSubscription = {
      _id: `sub_${Date.now()}`,
      userId,
      planId,
      plan,
      status: "active",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userSubscriptions.push(newSubscription);

    return NextResponse.json({
      message: "Subscription created successfully",
      subscription: newSubscription,
    }, { status: 201 });
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
    const type = searchParams.get("type");

    if (type === "plans") {
      return NextResponse.json({ plans: subscriptionPlans });
    }

    if (type === "active") {
      const activeSubs = userSubscriptions.filter(sub => sub.status === "active");
      return NextResponse.json({ subscriptions: activeSubs });
    }

    return NextResponse.json({ subscriptions: userSubscriptions });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
