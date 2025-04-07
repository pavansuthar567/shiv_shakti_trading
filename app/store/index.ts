import { combineReducers, configureStore } from "@reduxjs/toolkit";

import user from "./slices/userSlice";
import brand from "./slices/brandSlice";
import productCategory from "./slices/productCategorySlice";
import product from "./slices/productSlice";
import order from "./slices/orderSlice";
import cart from "./slices/cartSlice";
import home from "./slices/homeSlice";
import common from "./slices/commonSlice";
import auth from "./slices/authSlice";
// ----------------------------------------------------------------------

const reducers = combineReducers({
  auth,
  user,
  brand,
  productCategory,
  product,
  order,
  cart,
  home,
  common,
});

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
