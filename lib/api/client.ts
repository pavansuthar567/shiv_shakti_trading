import { ApiResponse } from "@/lib/types/order";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = this.getBaseURL();
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private getBaseURL(): string {
    if (process.env.NODE_ENV === "development") {
      return process.env.NEXT_PUBLIC_DEV_API_URL || "http://localhost:8081/api";
    }
    return (
      process.env.NEXT_PUBLIC_PROD_API_URL ||
      "https://api.shivshaktitrading.com/api"
    );
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        if (typeof window !== "undefined") {
          const token = this.getAuthToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(this.handleError(error));
      },
    );
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;

    // Try localStorage first
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      try {
        const parsed = JSON.parse(userDetails);
        return parsed.token || null;
      } catch {
        return null;
      }
    }

    // Fallback to cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    return token || null;
  }

  private handleUnauthorized(): void {
    if (typeof window !== "undefined") {
      // Clear auth data
      localStorage.removeItem("userDetails");
      localStorage.setItem("isLoggedIn", "false");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to login
      window.location.href = "/";
    }
  }

  private handleError(error: any): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    if (error.message) {
      return new Error(error.message);
    }
    return new Error("An unexpected error occurred");
  }

  // Generic request methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return this.handleResponse(response);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return this.handleResponse(response);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return this.handleResponse(response);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return this.handleResponse(response);
  }

  private handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
    const { data } = response;

    if (!data.success && data.error) {
      throw new Error(data.error);
    }

    return data.data as T;
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get("/health");
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for convenience
export type { AxiosRequestConfig, AxiosResponse };
