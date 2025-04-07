import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignUp: false,
  isSignIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsSignUp: (state, action) => {
      state.isSignUp = action.payload;
    },
    setIsSignIn: (state, action) => {
      state.isSignIn = action.payload;
    },
  },
});

export const { setIsSignUp, setIsSignIn } = authSlice.actions;
export default authSlice.reducer;
