import { createSlice } from '@reduxjs/toolkit';

export const orderInitDetails = {
  user: null,
  items: [],
  totalAmount: 0,
  status: 'pending',
};

const initialState = {
  orderList: [],
  perPageCount: 12,
  orderLoading: false,
  crudOrderLoading: false,
  selectedOrder: orderInitDetails,
  exportExcelLoading: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    setPerPageCount: (state, action) => {
      state.perPageCount = action.payload;
    },
    setOrderLoading: (state, action) => {
      state.orderLoading = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    setCrudOrderLoading: (state, action) => {
      state.crudOrderLoading = action.payload;
    },
    setExportExcelLoading: (state, action) => {
      state.exportExcelLoading = action.payload;
    },
  },
});

export const {
  setOrderList,
  setPerPageCount,
  setOrderLoading,
  setSelectedOrder,
  setCrudOrderLoading,
  setExportExcelLoading,
} = orderSlice.actions;

export default orderSlice.reducer;
