import Api from "@/shared/config/api";

const Apis = {
  GET_ALL: "/employee",
};

export const getAllEmployee = async (options) => {
  const { data }: any = await Api.getWithParams(Apis.GET_ALL, options);
  return data;
};
