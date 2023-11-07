import * as yup from "yup";

import { Zone } from "@/constants/common";
//import { ERROR_MESSAGES } from "@/constants/errors";

export const tableSchema = yup.object().shape({
  numberTable: yup.number().typeError("Phải là số").min(1,"Không được nhỏ hơn 1!"),
  numberOfGuest: yup.number().typeError("Phải là số").min(1,"Không được nhỏ hơn 1!"),
  date: yup
    .date()
    .transform((_, value) => (value ? new Date(value) : null))
    .required("Trường này là bắt buộc!"),
  zone : yup.mixed<string>().oneOf(Object.values(Zone)),
  email: yup
    .string()
    .email("Emaiol không hợp lệ!")
    .required("Trường này là bắt buộc!"),
  fullName: yup
    .string()
    .required("Trường này là bắt buộc!"),
  phone: yup.string().matches(/^(0[1-9][0-9]{8,9})$/,"Số điện thoại không hợp lệ!")
});