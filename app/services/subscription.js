import axios from "axios";
import { apiUrl } from "../../_helpers";

export const subscriptionService = {
  // Create subscription
  createSubscription: async (subscriptionData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/subscription`,
        subscriptionData,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get subscription plans
  getPlans: async () => {
    try {
      const response = await axios.get(`${apiUrl}/subscription?type=plans`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get active subscriptions
  getActiveSubscriptions: async () => {
    try {
      const response = await axios.get(`${apiUrl}/subscription?type=active`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user subscriptions
  getUserSubscriptions: async () => {
    try {
      const response = await axios.get(`${apiUrl}/subscription`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel subscription
  cancelSubscription: async (subscriptionId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/subscription/${subscriptionId}/cancel`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Renew subscription
  renewSubscription: async (subscriptionId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/subscription/${subscriptionId}/renew`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
