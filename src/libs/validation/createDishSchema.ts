import * as yup from "yup";

import { ERROR_MESSAGES } from "@/constants/errors";

export const createDishSchema = yup.object().shape({
  
  dishName: yup.string().required(ERROR_MESSAGES.DISH_NAME_REQUIRED),
  description: yup.string().nullable(),
  price: yup.number()
    .typeError(ERROR_MESSAGES.PRICE_MUST_NUMBER)
    .min(0, ERROR_MESSAGES.PRICE_MIN_0)
    .max(1000000000, ERROR_MESSAGES.PRICE_MAX_1_BILLION)
    .required(ERROR_MESSAGES.PRICE_REQUIRED),
  image: yup.string().nullable(),
  typeId: yup.string().required(ERROR_MESSAGES.TYPEID_REQUIRED),
});
