import Api from "@/shared/config/api";

const Apis = {
  FEEDBACK_URL: "/feedback"
};

export const getAllFeedBack = async () => {
  const { data }: any = await Api.get(Apis.FEEDBACK_URL);
  return data;
};

export const createFeedBack = async (params: any) => {
  const { data }: any = await Api.post(Apis.FEEDBACK_URL, params);
  return data;
};

export const getAllFeedbackByCombo = async (id: any) => {
  const { data }: any = await Api.get(`${Apis.FEEDBACK_URL}/${id}`);
  return data;
};

export const updateFeedBack = async (id: number, params: any) => {
  const { data }: any = await Api.patch(`${Apis.FEEDBACK_URL}/${id}`, params);
  return data;
};
