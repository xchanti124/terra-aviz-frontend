import { createSlice } from "@reduxjs/toolkit";

export const initialAuthState = {
  isLoggedIn: false,
  userId: 0,
};

export const authSlice = createSlice({
  name: "locations",
  initialState: initialAuthState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { setLoggedIn, setUserId } = authSlice.actions;
export default authSlice.reducer;

