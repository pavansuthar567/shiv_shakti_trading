import { createSlice } from '@reduxjs/toolkit';

export const cartInitDetails = {
  user: null,
  items: [],
};

const initialState = {
  cartList: [],
  cartLoading: false,
  crudCartLoading: false,
  selectedCart: cartInitDetails,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartList: (state, action) => {
      state.cartList = action.payload;
    },
    setCartLoading: (state, action) => {
      state.cartLoading = action.payload;
    },
    setSelectedCart: (state, action) => {
      state.selectedCart = action.payload;
    },
    setCrudCartLoading: (state, action) => {
      state.crudCartLoading = action.payload;
    },
    addToCart: (state, action) => {
      state.selectedCart.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.selectedCart.items = state.selectedCart.items.filter(
        (item) => item.product !== action.payload
      );
    },
    clearCart: (state) => {
      state.selectedCart.items = [];
    },
  },
});

export const {
  setCartList,
  setCartLoading,
  setSelectedCart,
  setCrudCartLoading,
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
