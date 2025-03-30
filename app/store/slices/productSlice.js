import { createSlice } from '@reduxjs/toolkit';

export const productInitDetails = {
  productId: '',
  name: '',
  description: '',
  price: 0,
  category: null,
  brand: null,
  stock: 0,
  image: '',
  size: '',
  color: '',
  genderCategory: 'unisex',
};

const initialState = {
  productList: [],
  perPageCount: 12,
  productLoading: false,
  crudProductLoading: false,
  selectedProduct: productInitDetails,
  exportExcelLoading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setPerPageCount: (state, action) => {
      state.perPageCount = action.payload;
    },
    setProductLoading: (state, action) => {
      state.productLoading = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setCrudProductLoading: (state, action) => {
      state.crudProductLoading = action.payload;
    },
    setExportExcelLoading: (state, action) => {
      state.exportExcelLoading = action.payload;
    },
  },
});

export const {
  setProductList,
  setPerPageCount,
  setProductLoading,
  setSelectedProduct,
  setCrudProductLoading,
  setExportExcelLoading,
} = productSlice.actions;

export default productSlice.reducer;
