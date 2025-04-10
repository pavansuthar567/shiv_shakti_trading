"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { useCallback, useEffect } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { getOrders } from "@/app/services/order";
import { useAuthStore } from "@/store/useAuthStore";

export default function OrdersTable() {
  const { toast } = useToast();
  const { isSignedIn } = useAuthStore();
  const { orders, loading, setOrders, setLoading } = useOrderStore();

  const loadData = useCallback(async () => {
    // try {
    //   setLoading(true);
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,
    //     { cache: "no-store" },
    //   );

    //   const res = await response.json();

    //   if (!response.ok) {
    //     throw new Error(res.error || res.message || "Signin failed");
    //   }

    //   const orders = res?.data?.data;
    //   setOrders(orders);
    //   console.log("orders?.length", orders?.length, "orders", orders);
    // } catch (err) {
    //   const error =
    //     err instanceof Error ? err.message : "An unknown error occurred";
    //   toast({ variant: "destructive", title: error });
    //   console.error("Error fetching orders:", error);
    // } finally {
    //   setLoading(false);
    // }

    if (!isSignedIn) return;

    try {
      setLoading(true);
      const response = await getOrders(); // Fetch by userId internally
      const orders = response?.data || {};
      console.log("orders", orders);
      setOrders(orders);
      console.log("orders?.length", orders?.length, "orders", orders);
    } catch (err) {
      const error =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({ variant: "destructive", title: error });
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, setLoading, setOrders, toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="py-2">
      <h1 className="p-2 text-left text-2xl font-bold">Orders</h1>
      {orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>#{order.orderId}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>₹{order.totalAmount}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/orders/${order._id}`}
                    className="text-primary hover:underline"
                  >
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      ) : (
        <>
          <span className="p-2">
            {isSignedIn === null
              ? "You don’t have an account yet. Sign up to start shopping!"
              : isSignedIn === false
                ? "You’re not signed in. Please sign in to view your orders."
                : "Your order list is empty. Start shopping!"}
          </span>
        </>
      )}
    </div>
  );
}
