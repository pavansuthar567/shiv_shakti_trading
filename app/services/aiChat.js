import axios from "axios";
import { apiUrl } from "../../_helpers";

export const aiChatService = {
  // General chat
  sendMessage: async (message, type = "general") => {
    try {
      const response = await axios.post(`${apiUrl}ai-chat`, {
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
      const response = await axios.post(`${apiUrl}ai-chat`, {
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
      const response = await axios.post(`${apiUrl}ai-chat`, {
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
      const response = await axios.post(`${apiUrl}ai-chat`, {
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
      const response = await axios.post(`${apiUrl}ai-chat`, {
        message,
        type: "shipping-info",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
