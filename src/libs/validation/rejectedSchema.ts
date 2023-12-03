import * as yup from "yup";
import moment from "moment";

import { ERROR_MESSAGES } from "@/constants/errors";

export const rejectedSchema = yup.object().shape({
  date: yup
    .date()
    .min(new Date(), ERROR_MESSAGES.NOT_BEFORE_TODAY)
    .transform((_, value) => (value ? new Date(value) : null))
    .required(ERROR_MESSAGES.REQUIRED_FIELD),

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
