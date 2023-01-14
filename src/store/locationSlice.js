import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {},
  reducers: {
    fetchSuccess() {
      console.log("hi");
    },
    fetchFailed(m) {
      console.error(m);
    },
  },
});

export const { fetchSuccess, fetchFailed } = locationSlice.actions;
export default locationSlice.reducer;
