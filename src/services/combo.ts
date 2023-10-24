import Api from "@/shared/config/api";

const Apis = {
  GET_ALL: "/combo-menu",
  GET_COMBO_SERVICE: "/combo-menu/service",
};

export const getAllComboMenu = async (params: object) => {
  const { data }: any = await Api.getWithParams(Apis.GET_ALL, params);
  return data;
};

export const getComboByServiceId = async (serviceId: number) => {
  const { data }: any = await Api.get(`${Apis.GET_COMBO_SERVICE}/${serviceId}`);
  return data;
};

export const getMenuComboById = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.GET_ALL}/${id}`);
  return data;
};
