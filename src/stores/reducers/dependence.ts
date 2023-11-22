import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const REDUCER_NAME = "dependence";

export type DefType = {
  def: number;
};

const initialState: DefType = { def : 0 };

export const defReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setDependence(state, _) {
      state.def = Math.random();
    },
  }
});

export default defReducer.reducer;
export const selectDef = () => (state: RootState) => state?.def?.def;
