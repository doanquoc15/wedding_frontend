import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/stores/store";

const REDUCER_NAME = "tabBook";

export type TabBookState = {
  indexTab: number;
};

const initialState: TabBookState = {
  indexTab: 0,
};

export const tabBookReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    nextTab(state) {
      state.indexTab = state.indexTab + 1;
    },
    backTab(state) {
      state.indexTab = state.indexTab - 1;
    },
    gotoTab(state, action) {
      state.indexTab = action.payload.tabCurrent;
    },
    resetTab(state) {
      state.indexTab = 0;
    },
  },
});

export default tabBookReducer.reducer;

export const selectTabBook = () => (state: RootState) => state?.tabBook;
