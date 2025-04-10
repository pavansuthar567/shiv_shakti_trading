import SignInSignUpModal from "@/components/auth/SignInSignUpModal";
import OrdersTable from "@/components/order/OrdersTable";
import ProductsMarqueeWrapper from "@/components/product/ProductsMarqueeWrapper";
import { Order } from "@/lib/types";
// import { useOrderStore } from "@/store/useOrderStore";
// import { getOrderById, getOrdersId } from "@/lib/api/orders";
// import type { Metadata } from "next";

export const dynamicParams = false;

// type Props = {
//   params: { orderId: string };
// };

// type OrderIdType = {
//   id: string;
// };

// export async function generateStaticParams() {
//   const orderIds = await getOrdersId();
//   return orderIds.map((order: OrderIdType) => {
//     return {
//       orderId: order.id,
//     };
//   });
// }

// export async function generateStaticParams() {
//   let orders: Order[] = [];

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,
//     );
//     orders = await response.json();
//     console.log("orders", orders);
//   } catch (error) {
//     orders = [];
//     console.error("Error fetching orders:", error);
//   }
//   return orders.map((order: { id: string }) => {
//     return {
//       orderId: order.id,
//     };
//   });
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // const order: Order = await getOrderById(params.orderId);

//   console.log("params.orderId", params.orderId);

//   return {
//     title: `Order #${params.orderId}`,
//     alternates: {
//       canonical: `/order/${params.orderId}`,
//     },
//     description: "Order details and summary",
//   };
// }

const OrderPage = async () => {
  return (
    <div className="px-2">
      <OrdersTable />
      <SignInSignUpModal isFromMenuSheet={true} isFromOrder={true} />
      <ProductsMarqueeWrapper />
    </div>
    //   <section className="p-2">
    //   <OrdersTable />
    //   <ProductsMarqueeWrapper />
    // </section>
  );
};

export default OrderPage;
