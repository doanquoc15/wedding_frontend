import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const REDUCER_NAME = "statusApi";

export type statusApiState = {
  error?: string;
  success?: string;
  update?: string;
};

const initialState: statusApiState | any = null;

export const statusApiReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setMessageError(_, action) {
      return {
        error: action.payload,
      };
    },
    setMessageSuccess(_, action) {
      return {
        success: action.payload,
      };
    },
    setMessageUpdate(_, action) {
      return {
        success: action.payload,
      };
    },
    resetMessage(): any {
      return null;
    },
  },
});

export default statusApiReducer.reducer;

export const statusApiM = () => (state: RootState) => state;
