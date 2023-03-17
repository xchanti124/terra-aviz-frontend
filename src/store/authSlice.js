import { createSlice } from "@reduxjs/toolkit";

export const initialAuthState = { isLoggedIn: false };

export const authSlice = createSlice({
  name: "locations",
  initialState: initialAuthState,
  reducers: {
    loggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { loggedIn } = authSlice.actions;
export default authSlice.reducer;

