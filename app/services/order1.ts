import { apiClient } from "@/lib/api/client";
import {
  CreateOrderPayload,
  Order,
  OrderFilters,
  PaginatedResponse,
} from "@/lib/types/order";

export class OrderService2 {
  private static instance: OrderService2;

  private constructor() {}

  public static getInstance(): OrderService2 {
    if (!OrderService2.instance) {
      OrderService2.instance = new OrderService2();
    }
    return OrderService2.instance;
  }

  /**
   * Create a new order
   */
  async createOrder(orderData: CreateOrderPayload): Promise<Order> {
    try {
      return await apiClient.post<Order>("/order", orderData);
    } catch (error) {
      throw new Error(
        `Failed to create order: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Get all orders with optional filtering and pagination
   */
  async getOrders(filters?: OrderFilters): Promise<PaginatedResponse<Order>> {
    try {
      const params = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      // Add default pagination if not provided
      if (!filters?.page) params.append("page", "1");
      if (!filters?.limit) params.append("limit", "20");

      const url = `/order?${params.toString()}`;
      return await apiClient.get<PaginatedResponse<Order>>(url);
    } catch (error) {
      throw new Error(
        `Failed to fetch orders: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Get orders for a specific user
   */
  async getUserOrders(
    userId: string,
    filters?: OrderFilters,
  ): Promise<PaginatedResponse<Order>> {
    try {
      const params = new URLSearchParams({ userId });

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const url = `/order/user?${params.toString()}`;
      return await apiClient.get<PaginatedResponse<Order>>(url);
    } catch (error) {
      throw new Error(
        `Failed to fetch user orders: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Get a specific order by ID
   */
  async getOrderById(id: string): Promise<Order> {
    try {
      return await apiClient.get<Order>(`/order/${id}`);
    } catch (error) {
      throw new Error(
        `Failed to fetch order: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Update an existing order
   */
  async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    try {
      return await apiClient.put<Order>(`/order/${id}`, data);
    } catch (error) {
      throw new Error(
        `Failed to update order: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Delete an order
   */
  async deleteOrder(id: string): Promise<void> {
    try {
      await apiClient.delete(`/order/${id}`);
    } catch (error) {
      throw new Error(
        `Failed to delete order: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(id: string, status: Order["status"]): Promise<Order> {
    try {
      return await apiClient.put<Order>(`/order/${id}/status`, { status });
    } catch (error) {
      throw new Error(
        `Failed to update order status: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Get order statistics
   */
  async getOrderStats(userId?: string): Promise<{
    total: number;
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  }> {
    try {
      const params = userId ? `?userId=${userId}` : "";
      return await apiClient.get(`/order/stats${params}`);
    } catch (error) {
      throw new Error(
        `Failed to fetch order statistics: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Search orders
   */
  async searchOrders(
    query: string,
    filters?: OrderFilters,
  ): Promise<PaginatedResponse<Order>> {
    try {
      const params = new URLSearchParams({ q: query });

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const url = `/order/search?${params.toString()}`;
      return await apiClient.get<PaginatedResponse<Order>>(url);
    } catch (error) {
      throw new Error(
        `Failed to search orders: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

// Export singleton instance
export const orderService2 = OrderService2.getInstance();

// Export the class for testing purposes
// export { OrderService2 };
