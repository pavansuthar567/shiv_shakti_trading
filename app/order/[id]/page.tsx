"use client";
import { getOrderById } from "@/app/services/order";
import OrderDetails from "@/components/order/OrderDetails";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useCallback, useEffect } from "react";

type Props = {
  params: { id: string };
};

export default function OrderDetailPage({ params }: Props) {
  const { id } = params;
  const { loading, setLoading, setSelectedOrder } = useOrderStore();

  const { toast } = useToast();
  const { isSignedIn } = useAuthStore();

  const loadData = useCallback(async () => {
    if (!isSignedIn) return;

    try {
      setLoading(true);
      const response = await getOrderById(id); // Fetch by userId internally
      const order = response?.data || {};

      setSelectedOrder(order);
    } catch (err) {
      const error =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({ variant: "destructive", title: error });
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [id, isSignedIn, setLoading, setSelectedOrder, toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <section className="p-2">
      <OrderDetails loadData={loadData} />
      <div className="py-2"></div>
    </section>
  );
}
