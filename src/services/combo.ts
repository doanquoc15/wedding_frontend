import Api from "@/shared/config/api";

const Apis = {
  COMBO_URL: "/combo-menu",
  GET_COMBO_SERVICE: "/combo-menu/service",
};

export const getAllComboMenu = async (params: object) => {
  const { data }: any = await Api.getWithParams(Apis.COMBO_URL, params);
  return data;
};

export const getComboByServiceId = async (serviceId: number) => {
  const { data }: any = await Api.get(`${Apis.GET_COMBO_SERVICE}/${serviceId}`);
  return data;
};

export const getMenuComboById = async (id: number | string) => {
  console.log(id);
  const { data }: any = await Api.get(`${Apis.COMBO_URL}/${id}`);
  return data;
};

export const createComboMenu = async (params: object) => {
  const { data }: any = await Api.post(`${Apis.COMBO_URL}`, params);
  return data;
};

export const updateComboMenu = async (id: number, params: object) => {
  const { data }: any = await Api.patch(`${Apis.COMBO_URL}/${id}`, params);
  return data;
};

export const deleteComboMenu = async (id: number) => {
  const { data }: any = await Api.delete(`${Apis.COMBO_URL}/${id}`);
  return data;
};