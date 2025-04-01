import { apiUrl, fhelper } from "@/_helpers";
import axios from "axios";
// import { toastError } from ".";

export const getProducts = async (filters = {}) => {
  const url = `${apiUrl}product`;
  try {
    const res = await axios.get(url, { params: filters });
    const updated = res?.data?.data?.map((x, i) => ({ srNo: i + 1, ...x }));
    return fhelper.sortByField(updated) || [];
  } catch (e) {
    console.error("error fetching product categories", e);
    // toastError(e);
    return [];
  }
};

export const getProductById = async (id) => {
  const url = `${apiUrl}product/${id}`;

  try {
    const res = await axios.get(url);

    if (res) {
      return res?.data?.data;
    }
    return {};
  } catch (e) {
    console.error("error fetching product categories", e);
    // toastError(e);
    return {};
  }
};
