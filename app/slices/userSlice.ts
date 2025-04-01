import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  // Define the shape of your user state here
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
