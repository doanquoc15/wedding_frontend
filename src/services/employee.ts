import Api from "@/shared/config/api";

const Apis = {
  GET_ALL: "/employee",
};

export const getAllEmployee = async (params) => {
  const { data }: any = await Api.get(Apis.GET_ALL, params);
  return data;
};

