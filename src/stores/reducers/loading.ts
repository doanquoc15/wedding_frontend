import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const REDUCER_NAME = "loading";

export type LoadingState = {
  isLoading: boolean;
};

const initialState: LoadingState = { isLoading: true };

export const loadingReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default loadingReducer.reducer;

export const selectLoading = () => (state: RootState) => state?.loading?.isLoading;
