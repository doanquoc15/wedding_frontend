import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const REDUCER_NAME = "tab";

export type refState = {
  tabIndex: number;
};

const initialState: refState = { tabIndex : 0 };

export const tabReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setTabIndexCurrent(state, action) {
      console.log("f",action.payload);
      state.tabIndex = action.payload;
    },
    resetTab(state) {
      state.tabIndex = 0;
    },
  }
});

export default tabReducer.reducer;
export const selectTabIndex = () => (state: RootState) => state?.tab?.tabIndex;

