import { apiUrl, fhelper } from "@/_helpers";
import axios from "axios";
// import { toastError } from ".";

export const getProductCategories = async () => {
  const url = `${apiUrl}product-category`;

  try {
    const response = await axios.get(url);
    const updated = response?.data?.data?.map((x, i) => ({
      srNo: i + 1,
      ...x,
    }));
    const categories = fhelper.sortByField(updated) || [];
    return categories;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    // toastError(error);
    return [] || false;
  }
};
