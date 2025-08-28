import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";

export default function SubscriptionPage() {
  // Mock user ID - replace with actual auth
  const userId = "user_123";

  return (
    <div className="container mx-auto px-4 py-8">
      <SubscriptionPlans userId={userId} />
    </div>
  );
}
