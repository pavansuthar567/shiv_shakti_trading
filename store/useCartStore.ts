import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id: number;
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  price: number;
  image: any;
  images: any;
  quantity: number;
  size?: string; // Add size support
};

export type CartItem = Product & {
  selectedSize?: string; // Track selected size
};

export type State = {
  cart: CartItem[];
  totalItems: number;
  totalAmount: number;
};

export type Actions = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  deleteFromCart: (item: CartItem) => void;
  clearCart: () => void;
  updateItemSize: (itemId: string, size: string) => void;
};

const INITIAL_STATE = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalAmount: INITIAL_STATE.totalAmount,
      addToCart: (product: CartItem) => {
        const cart = get().cart;
        // Check if product with same size already exists
        const cartItem = cart.find(
          (item) => 
            item._id === product._id && 
            item.selectedSize === product.selectedSize
        );
        
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id && item.selectedSize === product.selectedSize
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalAmount: Math.max(state.totalAmount + product.price, 0),
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalAmount: Math.max(state.totalAmount + product.price, 0),
          }));
        }
      },
      removeFromCart: (product: CartItem) => {
        const cart = get().cart;
        const cartItem = cart.find(
          (item) => 
            item._id === product._id && 
            item.selectedSize === product.selectedSize
        );
        if (cartItem) {
          const updatedCart = cart
            .map((item) =>
              item._id === product._id && item.selectedSize === product.selectedSize
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0);
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalAmount: Math.max(state.totalAmount - product.price, 0),
          }));
        }
      },
      deleteFromCart: (product: CartItem) => {
        const cart = get().cart;
        const updatedCart = cart.filter(
          (item) => 
            !(item._id === product._id && item.selectedSize === product.selectedSize)
        );
        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems - product.quantity,
          totalAmount: Math.max(
            state.totalAmount - product.price * product.quantity,
            0,
          ),
        }));
      },
      clearCart: () => {
        set(INITIAL_STATE);
      },
      updateItemSize: (itemId: string, size: string) => {
        const cart = get().cart;
        const updatedCart = cart.map((item) =>
          item._id === itemId ? { ...item, selectedSize: size } : item
        );
        set({ cart: updatedCart });
      },
    }),
    {
      name: "cart",
    },
  ),
);
