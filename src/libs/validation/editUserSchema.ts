import * as yup from "yup";

import { GENDER } from "@/constants/common";
export const editUserSchema = yup.object().shape({
  dateOfBirth: yup.date()
    .max(new Date(), "Date of birth must be on or before today")
    .required("Date of birth is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Invalid phone number").required("Phone number is required"),
  gender: yup.string().oneOf(Object.values(GENDER), "Không hợp lệ"),
  province: yup.number().required("Province is required"),
  district: yup.string().required("District is required"),
  award: yup.string().required("Award is required"),
});