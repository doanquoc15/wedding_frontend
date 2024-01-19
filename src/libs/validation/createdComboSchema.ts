import * as yup from "yup";

export const createdComboSchema = yup.object().shape({
  comboName: yup.string().required("Tên combo là bắt buộc"),
  description: yup.string().required("Mô tả là bắt buộc"),
  serviceId: yup.string().required("Loại dịch vụ là bắt buộc"),
});