import Api from "@/shared/config/api";

const Apis = {
  GET_ALL: "/type-dish",
};

export const getAllTypeDish = async (params: object) => {
  const data: any = await Api.getWithParams(Apis.GET_ALL, params);
  return data.data;
};
