import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const subscriptionService = {
  // Create subscription
  createSubscription: async (subscriptionData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/subscription`, subscriptionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get subscription plans
  getPlans: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/subscription?type=plans`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get active subscriptions
  getActiveSubscriptions: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/subscription?type=active`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user subscriptions
  getUserSubscriptions: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/subscription`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/subscription/${subscriptionId}/cancel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Renew subscription
  renewSubscription: async (subscriptionId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/subscription/${subscriptionId}/renew`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
