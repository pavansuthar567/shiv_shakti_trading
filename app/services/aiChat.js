import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const aiChatService = {
  // General chat
  sendMessage: async (message, type = "general") => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai-chat`, {
        message,
        type,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get product recommendations
  getRecommendations: async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai-chat`, {
        message,
        type: "recommendations",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get size recommendations
  getSizeRecommendations: async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai-chat`, {
        message,
        type: "size-recommendations",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get care instructions
  getCareInstructions: async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai-chat`, {
        message,
        type: "care-instructions",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get shipping info
  getShippingInfo: async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai-chat`, {
        message,
        type: "shipping-info",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
