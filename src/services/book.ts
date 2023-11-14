import Api from "@/shared/config/api";

const Apis = {
  BOOK_URL: "/book",
};

export const getAllBooking = async (params: object) => {
  const { data }: any = await Api.getWithParams(Apis.BOOK_URL, params);
  return data;
};

export const createBooking = async (params: any) => {
  const { data }: any = await Api.post(Apis.BOOK_URL, params);
  return data;
};
