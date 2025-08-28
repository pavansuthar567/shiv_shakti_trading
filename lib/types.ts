import { z } from "zod";

export type ProductSize = {
  size: string;
  available: boolean;
  quantity: number;
};

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
  sizes?: ProductSize[]; // Multiple sizes support
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

export type Feedback = {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FeedbackStats = {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
};

export type AIChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export type SubscriptionPlan = {
  _id: string;
  name: string;
  duration: 'weekly' | 'monthly';
  price: number;
  features: string[];
  isActive: boolean;
};

export type UserSubscription = {
  _id: string;
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};
