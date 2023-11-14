import Api from "@/shared/config/api";

const Apis = {
  GET_ALL: "/zone",
};

export const getAllZones = async (params: object) => {
  const { data }: any = await Api.getWithParams(Apis.GET_ALL, params);
  return data;
};
