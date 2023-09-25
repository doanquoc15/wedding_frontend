import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import statusApiReducer from "./reducers/statusAPI";
import usersReducer from "./reducers/user";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

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
