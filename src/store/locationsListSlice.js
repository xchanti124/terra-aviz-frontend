import { createSlice } from "@reduxjs/toolkit";

export const locationsListSlice = createSlice({
  name: "locations",
  initialState: {
    locations: [],
    maxPage: 0,
  },
  reducers: {
    fetchSuccess(state, action) {
      state.locations = action.payload.result;
      state.maxPage = action.payload.maxPage.maxPage;
    },
    fetchFailed(e) {
      console.error(e, "FETCH FAILED");
    },
  },
});

export const { fetchSuccess, fetchFailed } = locationsListSlice.actions;
export default locationsListSlice.reducer;
