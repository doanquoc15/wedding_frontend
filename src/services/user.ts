import Api from "@/shared/config/api";
import { IResponse, SignInType, SignUpType } from "@/types/common";

const Apis = {
  USER_ID: "/user",
  SIGN_UP: "/auth/signup",
};

export const GetUserById = async (id: number) => {
  const data: any = await Api.get(`${Apis.USER_ID}/${id}`);
  console.log(data);
  return data;
};

export const SignUpAPI = async (params: SignUpType) => {
  const data: IResponse = await Api.post(Apis.SIGN_UP, params);
  return data;
};
