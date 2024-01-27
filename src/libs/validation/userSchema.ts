import * as yup from "yup";

export const createdUserSchema = yup.object().shape({
  dateOfBirth: yup
    .date()
    .transform((_, value) => (value ? new Date(value) : null))
    .max(new Date(), "Date of birth must be on or before today")
    .nullable()
    .default(null),
  name: yup.string().required("Trường tên là bắt buộc").min(2, "Phải nhiều hơn hai ký tự"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  phone: yup.string().transform((_, value) => (value ? value : null)).matches(/^[0-9]{10}$/, "Số điện thoại không" +
    " hợp lệ").trim("Không được có khoảng trắng")
    .nullable()
    .notRequired(),
  gender: yup.string().nullable(),
  province: yup.string().nullable(),
  district: yup.string().nullable(),
  ward: yup.string().nullable(),
  address: yup.string().nullable(),
});