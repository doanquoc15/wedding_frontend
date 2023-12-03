import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const REDUCER_NAME = "breadCrumb";

export interface IBreadCrumb {
  routes: any;
}

const initialState: IBreadCrumb = {
  routes: null,
};

export const breadCrumbReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setBreadCrumbs(state, action) {
      state.routes = action.payload.routes;
      saveBreadcrumbToLocalStorage(state.routes);
    },

    addBreadCrumbs(state, action) {
      state.routes = [...state.routes, ...action.payload];
      saveBreadcrumbToLocalStorage([...state.routes, ...action.payload]);
    },

    resetBreadCrumb(state) {
      state.routes = null;
    },
  },
});
// Lưu breadcrumb vào Local Storage
const saveBreadcrumbToLocalStorage = (breadcrumbData) => {
  localStorage.setItem("breadcrumb", JSON.stringify(breadcrumbData));
};

export default breadCrumbReducer.reducer;
export const selectBreadCrumbs = (state: RootState) => state?.breadCrumb;
