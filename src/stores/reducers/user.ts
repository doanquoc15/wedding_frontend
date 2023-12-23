// import { createSlice } from "@reduxjs/toolkit";
//
// import { INotification } from "@/types/common";
//
// import { RootState } from "../store";
//
// const REDUCER_NAME = "users";
//
// export type User = {
//   id: string;
//   name: string;
// };
//
// export type UserState = {
//   users: User[];
//   loading: boolean;
//   error?: Error | null;
//   dep?: number;
//   fetchedNotification?: INotification[];
//   userInfo: any;
// };
//
// const initialState: UserState = {
//   users: [],
//   dep: 0,
//   loading: false,
//   error: null,
//   fetchedNotification: [],
//   userInfo: null,
// };
//
// export const usersReducer = createSlice({
//   name: REDUCER_NAME,
//   initialState,
//   reducers: {
//     setStatus: (state) => {
//       state.dep = Math.random();
//     },
//     setNotificationsUser: (state, action) => {
//       state.fetchedNotification = action.payload;
//     },
//     setUserInfo: (state, action) => {
//       state.userInfo = action.payload;
//     },
//
//     setReadNotification: (state, action) => {
//       let notiNew;
//       const index: any = state.fetchedNotification?.findIndex(
//         (item) => item.id === action.payload
//       );
//       if (index !== -1 && state.fetchedNotification) {
//         notiNew = [...state.fetchedNotification];
//         notiNew[index].isRead = true;
//       }
//       state.fetchedNotification = notiNew;
//     },
//   },
// });
//
// export default usersReducer.reducer;
//
// export const selectUsers = () => (state: RootState) => state.users;
// export const selectStatus = () => (state: RootState) => state.users.dep;
// export const selectNotification = () => (state: RootState) =>
//   state?.users?.fetchedNotification;

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { RootState } from "@/stores/store";

const REDUCER_NAME = "users";

export type User = {
  id: string;
  name: string;
};

export type UserState = {
  users: User[];
  loading: boolean;
  error?: Error;
  dep?: any;
  isFetchedUnreadNotification: boolean;
  userInfo: any;
};

const initialState: UserState = {
  users: [],
  dep: "",
  loading: false,
  error: undefined,
  isFetchedUnreadNotification: false,
  userInfo: null
};

export const fetchUsers = createAsyncThunk<User[], void, {
  rejectValue: Error
}>(`${REDUCER_NAME}/fetchUsers}`, async (data, { rejectWithValue }) => {
  try {
    // TODO: call async request here
    const users: User[] = await new Promise((resolve) => {
      const user: User = {
        id: "1",
        name: "Peter",
      };
      setTimeout(() => resolve([user]), 200);
    });
    return users;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

const hydrateAction = createAction<User[] | undefined>(HYDRATE);

export const usersReducer = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setStatus: (state) => {
      state.dep = Math.random();
    },
    setIsFetchedNotification: (state, action) => {
      state.isFetchedUnreadNotification = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateAction, (state: any, action) => {
      state.users = action.payload;
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default usersReducer.reducer;

export const selectUsers = () => (state: RootState) => state.users;
export const selectStatus = () => (state: RootState) => state.users.dep;
