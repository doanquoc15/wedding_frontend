import * as yup from "yup";
import moment from "moment";

import { ERROR_MESSAGES } from "@/constants/errors";

export const tableSchema = yup.object().shape({
  numberTable: yup.number().typeError(ERROR_MESSAGES.MUST_NUMBER).min(1, ERROR_MESSAGES.MIN_1),
  numberOfGuest: yup.number().typeError(ERROR_MESSAGES.MUST_NUMBER).min(1, ERROR_MESSAGES.MIN_1),
  date: yup
    .date()
    .min(new Date(), ERROR_MESSAGES.NOT_BEFORE_TODAY)
    .transform((_, value) => (value ? new Date(value) : null))
    .required(ERROR_MESSAGES.REQUIRED_FIELD),
  zone: yup.string().required(ERROR_MESSAGES.REQUIRED_FIELD),
  email: yup
    .string()
    .email(ERROR_MESSAGES.INVALID_EMAIL)
    .required(ERROR_MESSAGES.REQUIRED_FIELD),
  fullName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED_FIELD),
  phone: yup.string().matches(/^[0-9]{10}$/, ERROR_MESSAGES.INVALID_PHONE),
  comeInAt: yup.string().required(),
  comeOutAt: yup
    .string()
    .test("comeOutAt test", ERROR_MESSAGES.COME_OUT, function (value) {
      const { comeInAt } = this.parent;
      return isSameOrAfter(value, comeInAt);
    })
    .required(ERROR_MESSAGES.REQUIRED_FIELD),
});

const isSameOrAfter = (startTime, endTime) => {
  return moment(startTime, "HH:mm").isSameOrAfter(moment(endTime, "HH:mm"));
};
