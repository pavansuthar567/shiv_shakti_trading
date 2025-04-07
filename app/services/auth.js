// authService.ts
import { apiUrl } from "@/_helpers";
import axios from "axios";

export const register = async (userData) => {
  try {
    const res = await axios.post(`${apiUrl}auth/register`, userData);
    if (res?.data?.status === "error") {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (e) {
    const error = e?.response?.data?.message || e?.message;
    return { error, status: e?.response?.status || 500 };
  }
};

export const login = async (credentials) => {
  try {
    const res = await axios.post(`${apiUrl}auth/login`, credentials);
    if (res?.data?.status === "error") {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (e) {
    const error = e?.response?.data?.message || e?.message;
    return { error, status: e?.response?.status || 500 };
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${apiUrl}auth/forgot-password`, { email });
    return res?.data || {};
  } catch (e) {
    console.error("Forgot password error:", e);
    return {};
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}auth/reset-password`, data);
    return res?.data || {};
  } catch (e) {
    console.error("Reset password error:", e);
    return {};
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const res = await axios.post(`${apiUrl}auth/refresh-token`, {
      refreshToken,
    });
    return res?.data || {};
  } catch (e) {
    console.error("Refresh token error:", e);
    return {};
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(`${apiUrl}auth/logout`);
    return res?.data || {};
  } catch (e) {
    console.error("Logout error:", e);
    return {};
  }
};
