import Api from "@/shared/config/api";

const Apis = {
  PAYMENT: "/stripe",
};

export const paymentCheckout = async (data) => {
  const result: any = await Api.post(Apis.PAYMENT, data);
  return result.data;
};
