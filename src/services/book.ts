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

export const getAllBookingByUser = async (id: any) => {
  const { data }: any = await Api.get(`${Apis.BOOK_URL}/user/${id}`);
  return data;
};

export const updateBooking = async (id: number, params: any) => {
  const { data }: any = await Api.patch(`${Apis.BOOK_URL}/${id}`, params);
  return data;
};
export const deleteBooking = async (id: number) => {
  const { data }: any = await Api.delete(`${Apis.BOOK_URL}/${id}`);
  return data;
};
