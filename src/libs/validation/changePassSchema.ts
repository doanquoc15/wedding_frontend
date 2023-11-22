import * as yup from "yup";

import { ERROR_MESSAGES } from "@/constants/errors";

export const changePassSchema = yup.object().shape({
  oldPassword: yup.string().required(ERROR_MESSAGES.REQUIRED_FIELD),
  newPassword: yup
    .string()
    .min(8, ERROR_MESSAGES.PASSWORD_LEAST_8_CHARACTER)
    .required(ERROR_MESSAGES.REQUIRED_FIELD),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), ""], ERROR_MESSAGES.PASSWORD_MATCH)
    .required(ERROR_MESSAGES.REQUIRED_FIELD),
});