import { create } from "zustand";

type OrderItem = {
  product: string;
  quantity: number;
  amount: number;
  price: number;
  _id: string;
};

type Order = {
  orderId: number;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type OrderState = {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
};

type OrderActions = {
  setOrders: (orders: Order[]) => void;
  setSelectedOrder: (order: Order | null) => void;
  setLoading: (value: boolean) => void;
};

export const useOrderStore = create<OrderState & OrderActions>((set) => ({
  orders: [],
  selectedOrder: null,
  loading: false,
  setOrders: (orders) => set({ orders }),
  setSelectedOrder: (order) => set({ selectedOrder: order }),
  setLoading: (value) => set({ loading: value }),
}));
