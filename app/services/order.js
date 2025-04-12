// import { apiUrl } from "@/_helpers";
import { fhelper } from "@/_helpers";
import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8081/api/"
    : "https://shiv-shakti-trading.vercel.APP/api/";

export const createOrder = async (orderData) => {
  try {
    const res = await axios.post(`${apiUrl}order`, orderData);
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
    const res = await axios.get(`${apiUrl}order`, {
      params: { isFromSite: true },
    });
    if (res?.data?.status === "error") {
      throw new Error(res.data.message);
    }
    const orders = res?.data?.data || {};
    const sorted = fhelper.sortByField(orders, "updatedAt", -1) || [];

    return sorted;
  } catch (e) {
    const error = e?.response?.data?.message || e?.message;
    return { error, status: e?.response?.status || 500 };
  }
};

export const getOrderById = async (id) => {
  try {
    const res = await axios.get(`${apiUrl}order/${id}`);
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
    const res = await axios.put(`${apiUrl}order/${id}`, data);
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
    const res = await axios.delete(`${apiUrl}order/${id}`);
    if (res?.data?.status === "error") {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (e) {
    const error = e?.response?.data?.message || e?.message;
    return { error, status: e?.response?.status || 500 };
  }
};
