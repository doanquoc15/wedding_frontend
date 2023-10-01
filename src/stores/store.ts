import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// eslint-disable-next-line import/no-named-as-default
import statusApiReducer from "./reducers/statusAPI";
// eslint-disable-next-line import/no-named-as-default
import usersReducer from "./reducers/user";

const rootReducer = combineReducers({
  statusApi: statusApiReducer,
  users: usersReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
