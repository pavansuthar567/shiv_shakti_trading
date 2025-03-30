import { createSlice } from '@reduxjs/toolkit';

export const productCategoryInitDetails = {
  name: '',
};

const initialState = {
  productCategoryList: [],
  perPageCount: 12,
  productCategoryLoading: false,
  crudProductCategoryLoading: false,
  selectedProductCategory: productCategoryInitDetails,
  exportExcelLoading: false,
};

const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState,
  reducers: {
    setProductCategoryList: (state, action) => {
      state.productCategoryList = action.payload;
    },
    setPerPageCount: (state, action) => {
      state.perPageCount = action.payload;
    },
    setProductCategoryLoading: (state, action) => {
      state.productCategoryLoading = action.payload;
    },
    setSelectedProductCategory: (state, action) => {
      state.selectedProductCategory = action.payload;
    },
    setCrudProductCategoryLoading: (state, action) => {
      state.crudProductCategoryLoading = action.payload;
    },
    setExportExcelLoading: (state, action) => {
      state.exportExcelLoading = action.payload;
    },
  },
});

export const {
  setProductCategoryList,
  setPerPageCount,
  setProductCategoryLoading,
  setSelectedProductCategory,
  setCrudProductCategoryLoading,
  setExportExcelLoading,
} = productCategorySlice.actions;

export default productCategorySlice.reducer;
