import Api from "@/shared/config/api";

const Apis = {
  URL_NOTIFICATION: "/notification",
  URL_NOTIFICATION_USER: "/notification/user",
  URL_NOTIFICATION_UNREAD: "/notification/unread",
};

export const getAllNotification = async (options?: any) => {
  const { data }: any = await Api.getWithParams(Apis.URL_NOTIFICATION, options);
  return data;
};

export const getNotificationById = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.URL_NOTIFICATION}/${id}`);
  return data;
};

export const getNotificationByUserId = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.URL_NOTIFICATION_USER}/${id}`);
  return data;
};
export const getNotificationUnRead = async (id: number) => {
  const { data }: any = await Api.get(`${Apis.URL_NOTIFICATION_UNREAD}/${id}`);
  return data;
};

export const createNotification = async (params: any) => {
  const { data }: any = await Api.post(`${Apis.URL_NOTIFICATION}`, params);
  return data;
};

export const updateNotification = async (id: number, params: any) => {
  const { data }: any = await Api.patch(`${Apis.URL_NOTIFICATION}/${id}`, params);
  return data;
};
export const deleteNotification = async (id: any) => {
  const { data }: any = await Api.delete(`${Apis.URL_NOTIFICATION}/${id}`);
  return data;
};
