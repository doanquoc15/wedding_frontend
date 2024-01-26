import * as yup from "yup";

import { ERROR_MESSAGES } from "@/constants/errors";

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.INVALID_EMAIL)
    .required(ERROR_MESSAGES.EMAIL_REQUIRED),
  password: yup
    .string()
    .required(ERROR_MESSAGES.PASSWORD_REQUIRED)
    .min(8, ERROR_MESSAGES.PASSWORD_LEAST_8_CHARACTER),
  confirmPassword: yup
    .string()
    .required(ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref("password"), ""], ERROR_MESSAGES.PASSWORD_MATCH),
  name: yup
    .string()
    .required(ERROR_MESSAGES.NAME_REQUIRED)
    .min(6, ERROR_MESSAGES.NAME_LEAST_6_CHARACTER)
    .max(30, ERROR_MESSAGES.NAME_MAX_30_CHARACTER)
});