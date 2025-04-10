import { statusColors, statuses } from "@/_helpers/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem, StatusType } from "@/lib/types";
import { useOrderStore } from "@/store/useOrderStore";

export default function OrderDetails() {
  const { selectedOrder = {} }: { selectedOrder: any } = useOrderStore();
  const {
    items = [],
    totalAmount = 0,
    orderId,
    status,
  }: {
    items: [];
    totalAmount: number;
    orderId: number;
    status: StatusType;
  } = selectedOrder || {};

  return (
    <div>
      <div className="mt-2 flex flex-col gap-2">
        <h2 className="p-2 text-xl font-medium">
          Order Summary - #{orderId} -{" "}
          <span className={statusColors[status]}>{statuses[status]}</span>
        </h2>
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
