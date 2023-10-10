import Api from "@/shared/config/api";

const Apis = {
  GET_ALL: "/menu-item",
//  SIGN_UP: "/auth/signup",
};

interface PramsMenuItem{
    pageIndex ?: number;
    pageSize?:number;
    typeId?: number;
}

export const getAllFood = async (params) => {
  const data: any = await Api.getWithParams(Apis.GET_ALL,params);
  return data.data;
};
