export interface OrderItem {
  product: string;
  size: string; // Changed from selectedSize to size to match the interface
  flavor: string; // Add flavor field for juice
  quantity: number;
  finalQuantity: number; // Add finalQuantity field
  amount: number;
  price: number;
}

export interface Order {
  _id: string;
  orderId: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress?: Address;
  paymentStatus?: PaymentStatus;
  trackingNumber?: string;
}

export interface CreateOrderRequest {
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  anonymous: boolean;
}

export interface CreateOrderPayload {
  user: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderFilters {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
}
