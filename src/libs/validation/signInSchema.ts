import * as yup from "yup";

import { ERROR_MESSAGES } from "@/constants/errors";

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.INVALID_EMAIL)
    .required(ERROR_MESSAGES.EMAIL_REQUIRED),
  password: yup
    .string()
    .required(ERROR_MESSAGES.PASSWORD_REQUIRED),
});