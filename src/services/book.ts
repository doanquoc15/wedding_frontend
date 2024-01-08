import Api from "@/shared/config/api";

const Apis = {
  BOOK_URL: "/book",
  UPDATE_STATUS_BOOK_URL: "/book/status",
  UPDATE_PAYMENT_BOOK_URL: "/book/payment",
  ALL_FOOD_BOOK_URL: "/book/food",
  CHECK_BOOK_URL: "/book/check-custom",
  UPDATE_ALL_READ_URL: "/notification/read-all",
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

export const checkBookingIsCustom = async (id: any) => {
  const { data }: any = await Api.get(`${Apis.CHECK_BOOK_URL}/${id}`);
  return data;
};

export const getAllFoodByBooking = async (id: any) => {
  const { data }: any = await Api.get(`${Apis.ALL_FOOD_BOOK_URL}/${id}`);
  return data;
};

export const updateBooking = async (id: number, params: any) => {
  const { data }: any = await Api.patch(`${Apis.BOOK_URL}/${id}`, params);
  return data;
};

export const updateStatusBooking = async (id: number, params: any) => {
  console.log(id);
  const { data }: any = await Api.patch(`${Apis.UPDATE_STATUS_BOOK_URL}/${id}`, params);
  return data;
};

export const updatePaymentBooking = async (id: number, params: any) => {
  const { data }: any = await Api.patch(`${Apis.UPDATE_PAYMENT_BOOK_URL}/${id}`, params);
  return data;
};

export const updateAllRead = async (id: number, params: any) => {
  const { data }: any = await Api.patch(`${Apis.UPDATE_ALL_READ_URL}/${id}`, params);
  return data;
};

export const deleteBooking = async (id: number) => {
  const { data }: any = await Api.delete(`${Apis.BOOK_URL}/${id}`);
  return data;
};

export const getBookingById = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.BOOK_URL}/${id}`);
  return data;
};
export const getPercentBooking = async (params?: any) => {
  const { data }: any = await Api.getWithParams(`${Apis.BOOK_URL}/percent`, params);
  return data;
};
