import Api from "@/shared/config/api";

const Apis = {
  GET_ALL: "/type-dish",
//  SIGN_UP: "/auth/signup",
};

export const getAllTypeDish = async () => {
  const data: any = await Api.get(Apis.GET_ALL);
  return data.data;
};

//export const SignUpAPI = async (params: SignUpType) => {
//  const data: IResponse = await Api.post(Apis.SIGN_UP, params);
//  return { data };
//};
