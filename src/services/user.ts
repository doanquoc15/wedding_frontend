import Api from "@/shared/config/api";
import { IResponse, SignInType, SignUpType } from "@/types/common";

const Apis = {
  USER_ID: "/user",
  SIGN_UP: "/auth/signup",
  GET_ME: "/me/role",
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
