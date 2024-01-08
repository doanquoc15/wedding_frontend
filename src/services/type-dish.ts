import Api from "@/shared/config/api";

const Apis = {
  URL_TYPE: "/type-dish",
};

export const getAllType = async (options?: any) => {
  const { data }: any = await Api.getWithParams(Apis.URL_TYPE, options);
  return data;
};

export const getTypeById = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.URL_TYPE}/${id}`);
  return data;
};

export const createType = async (params: any) => {
  const { data }: any = await Api.post(`${Apis.URL_TYPE}`, params);
  return data;
};

export const updateType = async (id: number, params: any) => {
  const { data }: any = await Api.patch(`${Apis.URL_TYPE}/${id}`, params);
  return data;
};
export const deleteType = async (id: any) => {
  const { data }: any = await Api.delete(`${Apis.URL_TYPE}/${id}`);
  return data;
};
