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
import { fhelper } from "@/_helpers";
import { statusColors } from "@/_helpers/constants";

export default function OrdersTable() {
  const { toast } = useToast();
  const { isSignedIn } = useAuthStore();
  const { orders, loading, setOrders, setLoading } = useOrderStore();

  const loadData = useCallback(async () => {
    if (!isSignedIn) return;

    try {
      setLoading(true);
      const response = await getOrders(); // Fetch by userId internally

      if (response?.error) {
        throw new Error(response?.error);
      }

      const orders = response || [];
      setOrders(orders);
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
                <TableCell
                  className={`${statusColors[order.status]} font-semibold`}
                >
                  {order.status}
                </TableCell>
                <TableCell>₹{order.totalAmount}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/order/${order._id}`}
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
