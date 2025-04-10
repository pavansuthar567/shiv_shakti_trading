import { z } from "zod";

export type Product = {
  id: number;
  productId: number;
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  images: any;
  image: any;
  brand: any;
  size: string;
  fabric: string;
  color: string;
  weight: string;
  price: number;
  description: string;
  features: string;
  showOnHomepage: boolean;
  category: {
    name: string;
  };
  quantity: number;
};

export type Category = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
};

export const checkoutFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must contain at least 2 characters(s)",
  }),
  email: z.string().email(),
  phoneNumber: z.string().min(10, {
    message: "Invalid phone number",
  }),
  addressLine: z.string().min(2, {
    message: "Address too short",
  }),
  city: z.string().min(2, {
    message: "Invalid city",
  }),
  state: z.string().min(2, {
    message: "Invalid state",
  }),
  country: z.string().optional(),
  zipcode: z.string().min(6, {
    message: "Invalid zipcode",
  }),
});

export const invoiceSchema = checkoutFormSchema.extend({
  products: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
    }),
  ),
});

export type OrderItem = {
  product: Product;
  quantity: number;
  amount: number;
  price: number;
  _id: string;
};

export type Order = {
  orderId: number;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type StatusType = "pending" | "processing" | "delivered" | "cancelled";
