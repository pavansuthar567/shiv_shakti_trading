import { toast } from "react-toastify";
import {
  setProductCategoryLoading,
  setProductCategoryList,
  setCrudProductCategoryLoading,
  setSelectedProductCategory,
} from "@/app/store/slices/productCategorySlice";
import { fhelper } from "src/_helpers";
import axios from "axios";
import { toastError } from ".";

export const getProductCategories = () => async (dispatch) => {
  try {
    dispatch(setProductCategoryLoading(true));
    const res = await axios.get("product-category");
    const updated = res?.data?.data?.map((x, i) => ({ srNo: i + 1, ...x }));
    await dispatch(setProductCategoryList(fhelper.sortByField(updated) || []));
    return true;
  } catch (e) {
    toastError(e);
    return false;
  } finally {
    dispatch(setProductCategoryLoading(false));
  }
};

export const deleteProductCategory = (id) => async (dispatch) => {
  try {
    dispatch(setCrudProductCategoryLoading(true));
    const res = await axios.delete(`product-category/${id}`);
    if (res) {
      toast.success("Product Category deleted successfully");
      return true;
    } else return false;
  } catch (e) {
    toastError(e);
    return false;
  } finally {
    dispatch(setCrudProductCategoryLoading(false));
  }
};

export const createProductCategory = (payload) => async (dispatch) => {
  try {
    dispatch(setCrudProductCategoryLoading(true));
    const res = await axios.post("product-category", payload);

    if (res) {
      toast.success("Product Category inserted successfully");
      return true;
    }
    return false;
  } catch (e) {
    toastError(e);
    return false;
  } finally {
    dispatch(setCrudProductCategoryLoading(false));
  }
};

export const updateProductCategory = (obj) => async (dispatch) => {
  try {
    if (obj && obj?._id) {
      const { _id, __v, ...payload } = obj;
      if (_id) {
        dispatch(setCrudProductCategoryLoading(true));
        const res = await axios.put(`product-category/${_id}`, payload);

        if (res) {
          toast.success("Product Category updated successfully");
          return true;
        } else {
          toast.success("Product Category ID is required");
          return false;
        }
      }
      return false;
    }
    return false;
  } catch (e) {
    toastError(e);
    return false;
  } finally {
    dispatch(setCrudProductCategoryLoading(false));
  }
};

export const getProductCategory = (id) => async (dispatch) => {
  try {
    dispatch(setProductCategoryLoading(true));
    const res = await axios.get(`product-category/${id}`);

    if (res) {
      dispatch(setSelectedProductCategory(res?.data?.data));
      return res;
    }
    return false;
  } catch (e) {
    toastError(e);
    return false;
  } finally {
    dispatch(setProductCategoryLoading(false));
  }
};
