"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { SubscriptionPlan } from "@/lib/types";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { Check, Crown, Star } from "lucide-react";
import { useEffect } from "react";

interface SubscriptionPlansProps {
  userId: string;
  onSubscribe?: (plan: SubscriptionPlan) => void;
}

export default function SubscriptionPlans({ userId, onSubscribe }: SubscriptionPlansProps) {
  const { plans, setPlans, isLoading } = useSubscriptionStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/subscription?type=plans");
      if (response.ok) {
        const data = await response.json();
        setPlans(data.plans);
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          planId: plan._id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Subscription created!",
          description: `You've successfully subscribed to ${plan.name}.`,
          className: "border-green-600 text-green-800",
        });
        onSubscribe?.(plan);
      } else {
        throw new Error("Failed to create subscription");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-600 mt-2">
          Get regular deliveries of your favorite products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan._id}
            className={`relative ${
              plan.duration === "monthly"
                ? "border-2 border-primary shadow-lg"
                : "border"
            }`}
          >
            {plan.duration === "monthly" && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Crown className="h-4 w-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                {plan.duration === "monthly" && <Star className="h-5 w-5 text-yellow-500" />}
                <span>{plan.name}</span>
              </CardTitle>
              <CardDescription>
                {plan.duration === "weekly" ? "Weekly" : "Monthly"} delivery
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-4xl font-bold">₹{plan.price}</span>
                <span className="text-gray-600 ml-2">
                  /{plan.duration === "weekly" ? "week" : "month"}
                </span>
              </div>

              <ul className="space-y-3 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => handleSubscribe(plan)}
                className="w-full"
                variant={plan.duration === "monthly" ? "default" : "outline"}
              >
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Cancel or modify your subscription at any time</p>
        <p>Free shipping on all subscription orders</p>
      </div>
    </div>
  );
}
