import { statusColors, Statuses, statuses } from "@/_helpers/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem } from "@/lib/types";
import { useOrderStore } from "@/store/useOrderStore";
import { Button } from "../ui/button";
import { updateOrder } from "@/app/services/order";
import { useCallback, useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type Props = {
  loadData: () => void;
};

export default function OrderDetails({ loadData }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { isSignedIn } = useAuthStore();

  const { selectedOrder, loading, setLoading } = useOrderStore();
  const { items = [], totalAmount = 0, orderId, status } = selectedOrder ?? {};

  useEffect(() => {
    if (isSignedIn === undefined || isSignedIn === null) return;
    if (!isSignedIn) router.push(`/`);
  }, [router, isSignedIn]);

  const onCancelOrder = useCallback(async () => {
    try {
      setLoading(true);
      const response = await updateOrder(selectedOrder?._id, {
        status: Statuses.Cancelled,
      });

      if (response?.error) {
        throw new Error(response?.error);
      }

      if (loadData) loadData();
      toast({ title: "Order updated successfully" });
    } catch (err) {
      const error =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({ variant: "destructive", title: error });
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [loadData, selectedOrder?._id, setLoading, toast]);

  return (
    <div>
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="p-2 text-xl font-medium">
            Order Summary - #{orderId} -{" "}
            {status && (
              <span className={statusColors[status]}>{statuses[status]}</span>
            )}
          </h2>

          {status === Statuses.Pending && (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button disabled={loading || !selectedOrder?._id}>
                  Cancel
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-20 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-lg font-semibold">
                      Confirm Cancellation
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </Dialog.Close>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Are you sure you want to cancel this order?
                  </p>
                  <div className="mt-6 flex justify-end gap-2">
                    <Dialog.Close asChild>
                      <Button variant="outline">No</Button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <Button variant="destructive" onClick={onCancelOrder}>
                        Yes, Cancel
                      </Button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead className="text-right">UNIT PRICE</TableHead>
              <TableHead className="text-right">QTY</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((selectedOrder: OrderItem, index: number) => (
              <TableRow key={index}>
                <TableCell>{selectedOrder?.product?.name}</TableCell>
                <TableCell align="right">₹{selectedOrder?.price}</TableCell>
                <TableCell align="right">{selectedOrder?.quantity}</TableCell>
                <TableCell align="right">
                  ₹{selectedOrder?.price * selectedOrder?.quantity}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="right">₹{totalAmount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Shipping Cost</TableCell>
              <TableCell align="right">FREE</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow className="text-primary">
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="right">₹{totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
