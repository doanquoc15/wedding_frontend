import * as yup from "yup";

import { GENDER } from "@/constants/common";

export const createdUserSchema = yup.object().shape({
  dateOfBirth: yup.date()
    .max(new Date(), "Date of birth must be on or before today")
    .nullable(),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Invalid phone number").required("Phone number is required").nullable(),
  gender: yup.string().oneOf(Object.values(GENDER), "Không hợp lệ").nullable(),
  province: yup.string().nullable(),
  district: yup.string().nullable(),
  ward: yup.string().nullable(),
  address: yup.string().nullable(),
});