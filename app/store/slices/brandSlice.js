import { createSlice } from '@reduxjs/toolkit';

export const brandInitDetails = {
  name: '',
};

const initialState = {
  brandList: [],
  perPageCount: 12,
  brandLoading: false,
  crudBrandLoading: false,
  selectedBrand: brandInitDetails,
  exportExcelLoading: false,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrandList: (state, action) => {
      state.brandList = action.payload;
    },
    setPerPageCount: (state, action) => {
      state.perPageCount = action.payload;
    },
    setBrandLoading: (state, action) => {
      state.brandLoading = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setCrudBrandLoading: (state, action) => {
      state.crudBrandLoading = action.payload;
    },
    setExportExcelLoading: (state, action) => {
      state.exportExcelLoading = action.payload;
    },
  },
});

export const {
  setBrandList,
  setPerPageCount,
  setBrandLoading,
  setSelectedBrand,
  setCrudBrandLoading,
  setExportExcelLoading,
} = brandSlice.actions;

export default brandSlice.reducer;
