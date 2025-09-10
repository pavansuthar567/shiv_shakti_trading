// import { apiUrl } from "@/_helpers";
import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8081/api/"
    : "https://shiv-shakti-trading.vercel.APP/api/";

export const feedbackService = {
  // Submit feedback
  submitFeedback: async (feedbackData, token) => {
    try {
      console.log("feedbackData", feedbackData);
      const response = await axios.post(`${apiUrl}feedback`, feedbackData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response.data", response.data);
      if (response?.data?.status === "error") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      return { error: errorMessage, status: error?.response?.status || 500 };
    }
  },

  // Get product feedback
  getProductFeedback: async (productId) => {
    try {
      const response = await axios.get(
        `${apiUrl}feedback/product/${productId}`,
      );
      if (response?.data?.status === "error") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      return { error: errorMessage, status: error?.response?.status || 500 };
    }
  },

  // Get product feedback stats
  getProductFeedbackStats: async (productId) => {
    try {
      const response = await axios.get(
        `${apiUrl}feedback/product/${productId}/stats`,
      );
      if (response?.data?.status === "error") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      return { error: errorMessage, status: error?.response?.status || 500 };
    }
  },

  // Get user feedback
  getUserFeedback: async (token) => {
    try {
      const response = await axios.get(`${apiUrl}feedback/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response?.data?.status === "error") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      return { error: errorMessage, status: error?.response?.status || 500 };
    }
  },

  // Update feedback
  updateFeedback: async (feedbackId, updates, token) => {
    try {
      const response = await axios.put(
        `${apiUrl}feedback/${feedbackId}`,
        updates,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response?.data?.status === "error") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      return { error: errorMessage, status: error?.response?.status || 500 };
    }
  },

  // Delete feedback
  deleteFeedback: async (feedbackId, token) => {
    try {
      const response = await axios.delete(`${apiUrl}feedback/${feedbackId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response?.data?.status === "error") {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      return { error: errorMessage, status: error?.response?.status || 500 };
    }
  },
};
