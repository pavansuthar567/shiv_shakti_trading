import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const feedbackService = {
  // Submit feedback
  submitFeedback: async (feedbackData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get product feedback
  getProductFeedback: async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback?productId=${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user feedback
  getUserFeedback: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update feedback
  updateFeedback: async (feedbackId, updates) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/feedback/${feedbackId}`, updates);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete feedback
  deleteFeedback: async (feedbackId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/feedback/${feedbackId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
