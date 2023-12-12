import Api from "@/shared/config/api";
import { IResponse, SignUpType } from "@/types/common";

const Apis = {
  USER_ID: "/user",
  SIGN_UP: "/auth/signup",
  GET_ME: "user/me/my-account",
};

export const GetUserById = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.USER_ID}/${id}`);
  return data;
};

export const SignUpAPI = async (params: SignUpType) => {
  const { data }: IResponse = await Api.post(Apis.SIGN_UP, params);
  return data.data;
};

export const getMeRole = async () => {
  const { data }: IResponse = await Api.get(Apis.GET_ME);
  return data;
};

export const updateUser = async (id: number, params: object) => {
  const { data }: IResponse = await Api.patch(`${Apis.USER_ID}/${id}`, params);
  return data;
};

export const changePassword = async (id: number, params: object) => {
  const { data }: IResponse = await Api.patch(`${Apis.USER_ID}/change-password/${id}`, params);
  return data;
};

export const getAllUsers = async (params) => {
  const { data }: IResponse = await Api.getWithParams(`${Apis.USER_ID}`, params);
  return data;
};

export const createUser = async (params) => {
  const { data }: IResponse = await Api.post(`${Apis.USER_ID}`, params);
  return data;
};

export const deleteUser = async (id: number) => {
  const { data }: IResponse = await Api.delete(`${Apis.USER_ID}/${id}`);
  return data;
};