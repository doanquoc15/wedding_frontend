import * as yup from "yup";

export const schemaType = yup.object().shape({
  typeName: yup.string().required("Loại món ăn không được để trống"),
  description: yup.string().nullable(),
});