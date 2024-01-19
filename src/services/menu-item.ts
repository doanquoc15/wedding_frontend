import Api from "@/shared/config/api";
import { IResponse } from "@/types/common";

const Apis = {
  URL_DISH: "/menu-item",
  URL_TOP_DISH: "/menu-item/top",
};

export const getAllDish = async (options?: any) => {
  const { data }: any = await Api.getWithParams(Apis.URL_DISH, options);
  return data;
};

export const createDish = async (params: any) => {
  const { data }: any = await Api.post(`${Apis.URL_DISH}`, params);
  return data;
};

export const getDishById = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.URL_DISH}/${id}`);
  return data;
};

export const getTopDish = async (numb: number) => {
  const { data }: any = await Api.get(`${Apis.URL_TOP_DISH}/${numb}`);
  return data;
};

export const updateDish = async (id: number, params: object) => {
  const { data }: IResponse = await Api.patch(`${Apis.URL_DISH}/${id}`, params);
  return data;
};

export const deleteDish = async (id: number) => {
  const { data }: IResponse = await Api.delete(`${Apis.URL_DISH}/${id}`);
  return data;
};