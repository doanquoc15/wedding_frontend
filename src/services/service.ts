import Api from "@/shared/config/api";

const Apis = {
  URL_SERVICE: "/service",
};

export const getAllService = async (options?: any) => {
  const { data }: any = await Api.getWithParams(Apis.URL_SERVICE, options);
  return data;
};

export const getServiceById = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.URL_SERVICE}/${id}`);
  return data;
};

export const createService = async (params: any) => {
  const { data }: any = await Api.post(`${Apis.URL_SERVICE}`, params);
  return data;
};

export const updateService = async (id: number, params: any) => {
  const { data }: any = await Api.patch(`${Apis.URL_SERVICE}/${id}`, params);
  return data;
};
export const deleteService = async (id: any) => {
  const { data }: any = await Api.delete(`${Apis.URL_SERVICE}/${id}`);
  return data;
};
