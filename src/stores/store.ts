import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line import/order
import { combineReducers } from "redux";

// eslint-disable-next-line import/no-named-as-default
import { setupListeners } from "@reduxjs/toolkit/query";

// eslint-disable-next-line import/no-named-as-default
import statusApiReducer from "./reducers/statusAPI";
// eslint-disable-next-line import/no-named-as-default
import usersReducer from "./reducers/user";
// eslint-disable-next-line import/no-named-as-default
import tabReducer from "./reducers/tab";
// eslint-disable-next-line import/no-named-as-default
import breadCrumbReducer from "./reducers/breadCrumb";
// eslint-disable-next-line import/no-named-as-default
import loadingReducer from "./reducers/loading";
// eslint-disable-next-line import/no-named-as-default
import tabBookReducer from "./reducers/tabBook";

const rootReducer = combineReducers({
  statusApi: statusApiReducer,
  users: usersReducer,
  tab: tabReducer,
  breadCrumb: breadCrumbReducer,
  loading: loadingReducer,
  tabBook: tabBookReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
