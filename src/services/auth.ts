import Api from "@/shared/config/api";
import { IResponse, SignInType, SignUpType } from "@/types/common";

const Apis = {
  SIGN_IN: "/auth/signin",
  SIGN_UP: "/auth/signup",
};

export const SignInAPI = async (params: SignInType) => {
  const data: any = await Api.post(Apis.SIGN_IN, params);
  return data;
};

export const SignUpAPI = async (params: SignUpType) => {
  const data: IResponse = await Api.post(Apis.SIGN_UP, params);
  return data;
};
