import Api from "@/shared/config/api";
import { IResponse } from "@/types/common";

const Apis = {
  URL_EMPLOYEE: "/employee",
};

export const getAllEmployee = async (options?: any) => {
  const { data }: any = await Api.getWithParams(Apis.URL_EMPLOYEE, options);
  return data;
};

export const createEmployee = async (params: any) => {
  const { data }: any = await Api.post(`${Apis.URL_EMPLOYEE}`, params);
  return data;
};

export const getDishById = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.URL_EMPLOYEE}/${id}`);
  return data;
};

export const updateEmployee = async (id: number, params: object) => {
  const { data }: IResponse = await Api.patch(`${Apis.URL_EMPLOYEE}/${id}`, params);
  return data;
};

export const deleteEmployee = async (id: number) => {
  const { data }: IResponse = await Api.delete(`${Apis.URL_EMPLOYEE}/${id}`);
  return data;
};