import { Order, OrderItem } from "@/lib/types";
import { create } from "zustand";

export type OrderState = {
  orders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
};

export type OrderActions = {
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
