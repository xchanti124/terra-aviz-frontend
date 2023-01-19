import { createSlice } from "@reduxjs/toolkit";

export const locationsListSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
  },
  reducers: {
    fetchSuccess(state, action) {
      state.locations = action.payload;
    },
    fetchFailed(m) {
      console.error(m);
    },
    fetchByInput(state, action) {
      state.locations = action.payload;
    },
  },
});

export const { fetchSuccess, fetchFailed } = locationsListSlice.actions;
export default locationsListSlice.reducer;