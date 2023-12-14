import { createSlice } from "@reduxjs/toolkit";

import { INotification } from "@/types/common";

import { RootState } from "../store";

const REDUCER_NAME = "users";

export type User = {
  id: string;
  name: string;
};

export type UserState = {
  users: User[];
  loading: boolean;
  error?: Error | null;
  dep?: number;
  fetchedNotification?: INotification[];
  userInfo: any;
};

const initialState: UserState = {
  users: [],
  dep: 0,
  loading: false,
  error: null,
  fetchedNotification: [],
  userInfo: null,
};

export const usersReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setStatus: (state) => {
      state.dep = Math.random();
    },
    setNotificationsUser: (state, action) => {
      state.fetchedNotification = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    setReadNotification: (state, action) => {
      let notiNew;
      const index: any = state.fetchedNotification?.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1 && state.fetchedNotification) {
        notiNew = [...state.fetchedNotification];
        notiNew[index].isRead = true;
      }
      state.fetchedNotification = notiNew;
    },
  },
});

export default usersReducer.reducer;

export const selectUsers = () => (state: RootState) => state.users;
export const selectStatus = () => (state: RootState) => state.users.dep;
export const selectNotification = () => (state: RootState) =>
  state?.users?.fetchedNotification;
