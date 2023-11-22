import * as yup from "yup";

import { ERROR_MESSAGES } from "@/constants/errors";

export const tableSchema = yup.object().shape({
  numberTable: yup.number().typeError(ERROR_MESSAGES.MUST_NUMBER).min(1,ERROR_MESSAGES.MIN_1),
  numberOfGuest: yup.number().typeError(ERROR_MESSAGES.MUST_NUMBER).min(1,ERROR_MESSAGES.MIN_1),
  date: yup
    .date()
    .min(new Date(), ERROR_MESSAGES.NOT_BEFORE_TODAY)
    .transform((_, value) => (value ? new Date(value) : null))
    .required(ERROR_MESSAGES.REQUIRED_FIELD),
  zone : yup.string().required(ERROR_MESSAGES.REQUIRED_FIELD),
  email: yup
    .string()
    .email(ERROR_MESSAGES.INVALID_EMAIL)
    .required(ERROR_MESSAGES.REQUIRED_FIELD),
  fullName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_FIELD),
  phone: yup.string().matches(/^[0-9]{10}$/,ERROR_MESSAGES.INVALID_PHONE),
  time: yup.string().required("CCC"),
});