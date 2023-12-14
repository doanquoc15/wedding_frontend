import * as yup from "yup";

import { ERROR_MESSAGES } from "@/constants/errors";

export const serviceSchema = yup.object().shape({
  serviceName: yup.string().required(ERROR_MESSAGES.SERVICE_REQUIRED),
  description: yup.string().nullable(),
  price: yup
    .number()
    .typeError(ERROR_MESSAGES.PRICE_MUST_NUMBER)
    .min(0, ERROR_MESSAGES.PRICE_MIN_0)
    .max(1000000000, ERROR_MESSAGES.PRICE_MAX_1_BILLION)
    .required(ERROR_MESSAGES.PRICE_REQUIRED),
  image: yup.string().nullable(),
  capacity: yup
    .number()
    .typeError(ERROR_MESSAGES.CAPACITY_MUST_NUMBER)
    .min(1, ERROR_MESSAGES.CAPACITY_MIN_1)
    .required(ERROR_MESSAGES.CAPACITY_REQUIRED),
});
