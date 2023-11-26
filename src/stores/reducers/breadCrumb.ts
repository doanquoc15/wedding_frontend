import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const REDUCER_NAME = "breadCrumb";

export interface IBreadCrumb {
  headTitle?: string;
  tabTitle?: string;
  params?: Array<string> | any;
  routes: any;
  pageTitle?: string;
}

const initialState: IBreadCrumb = {
  headTitle: "",
  tabTitle: "",
  params: [],
  routes: [],
  pageTitle: "",
};

export const breadCrumbReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setBreadCrumbs(state, action) {
      state.routes = action.payload.routes;
      state.headTitle = action.payload.headTitle;
      state.params = action.payload.params;
      state.pageTitle = action.payload.pageTitle;
      state.tabTitle = action.payload.tabTitle;

      saveBreadcrumbToLocalStorage(state.routes);
    },

    addBreadCrumbs(state, action) {
      state.routes = [...state.routes, ...action.payload];

      saveBreadcrumbToLocalStorage([...state.routes, ...action.payload]);
    },

    resetBreadCrumb(state) {
      state.routes = [];
      state.headTitle = "";
      state.params = [];
      state.pageTitle = "";
      state.tabTitle = "";

      //clearBreadcrumbFromLocalStorage();
    },
  },
});
// Lưu breadcrumb vào Local Storage
const saveBreadcrumbToLocalStorage = (breadcrumbData) => {
  localStorage.setItem("breadcrumb", JSON.stringify(breadcrumbData));
};

// Xóa breadcrumb khỏi Local Storage
const clearBreadcrumbFromLocalStorage = () => {
  localStorage.removeItem("breadcrumb");
};

export default breadCrumbReducer.reducer;
export const selectBreadCrumbs = (state: RootState) => state?.breadCrumb;
