import Api from "@/shared/config/api";

const Apis = {
  GET_ALL: "/type-dish",
};

export const getAllTypeDish = async () => {
  const data: any = await Api.get(Apis.GET_ALL);
  return data.data;
};
