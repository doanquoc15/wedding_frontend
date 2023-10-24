import Api from "@/shared/config/api";

const Apis = {
  PAYMENT: "/stripe/checkout",
};

export const paymentCheckout = async (params) => {
  const { data }: any = await Api.post(Apis.PAYMENT, params);
  return data;
};
