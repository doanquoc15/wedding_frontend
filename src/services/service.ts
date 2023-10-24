import Api from "@/shared/config/api";

const Apis = {
  GET_ALL: "/service",
};

export const getAllService = async (options?: any) => {
  const { data }: any = await Api.getWithParams(Apis.GET_ALL, options);
  return data;
};

export const getServiceById = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.GET_ALL}/${id}`);
  return data;
};
