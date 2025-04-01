import { apiUrl } from "@/_helpers";
import axios from "axios";

export const getCart = async (userId) => {
  const url = `${apiUrl}cart?userId=${userId}`;
  try {
    const res = await axios.get(url);
    return res?.data || {};
  } catch (e) {
    console.error("Error fetching cart:", e);
    return {};
  }
};

export const addToCart = async (userId, itemData) => {
  const url = `${apiUrl}cart?userId=${userId}`;
  try {
    const res = await axios.post(url, itemData);
    return res?.data || {};
  } catch (e) {
    console.error("Error adding item to cart:", e);
    return {};
  }
};

export const updateCart = async (userId, updateData) => {
  const url = `${apiUrl}cart?userId=${userId}`;
  try {
    const res = await axios.put(url, updateData);
    return res?.data || {};
  } catch (e) {
    console.error("Error updating cart:", e);
    return {};
  }
};

export const removeFromCart = async (userId, productId) => {
  const url = `${apiUrl}cart/${productId}?userId=${userId}`;
  try {
    const res = await axios.delete(url);
    return res?.data || {};
  } catch (e) {
    console.error("Error removing item from cart:", e);
    return {};
  }
};

export const clearCart = async (userId) => {
  const url = `${apiUrl}cart?userId=${userId}`;
  try {
    const res = await axios.delete(url);
    return res?.data || {};
  } catch (e) {
    console.error("Error clearing cart:", e);
    return {};
  }
};
