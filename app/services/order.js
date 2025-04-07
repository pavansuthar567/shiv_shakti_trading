import { apiUrl } from "@/_helpers";
import axios from "axios";

export const createOrder = async (orderData) => {
  try {
    const res = await axios.post(`${apiUrl}orders`, orderData);
    if (res?.data?.status === "error") {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (e) {
    const error = e?.response?.data?.message || e?.message;
    return { error, status: e?.response?.status || 500 };
  }
};

export const getOrders = async () => {
  try {
    const res = await axios.get(`${apiUrl}orders`);
    if (res?.data?.status === "error") {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (e) {
    const error = e?.response?.data?.message || e?.message;
    return { error, status: e?.response?.status || 500 };
  }
};

export const getOrderById = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}orders/${id}`);
    if (res?.data?.status === "error") {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (e) {
    const error = e?.response?.data?.message || e?.message;
    return { error, status: e?.response?.status || 500 };
  }
};

export const updateOrder = async (id, data) => {
  try {
    const res = await axios.put(`${apiUrl}orders/${id}`, data);
    if (res?.data?.status === "error") {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (e) {
    const error = e?.response?.data?.message || e?.message;
    return { error, status: e?.response?.status || 500 };
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}orders/${id}`);
    if (res?.data?.status === "error") {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (e) {
    const error = e?.response?.data?.message || e?.message;
    return { error, status: e?.response?.status || 500 };
  }
};
