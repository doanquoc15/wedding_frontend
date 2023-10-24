import ld from "lodash";

export const removeVietnameseDiacritics = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};
export const createSlug = (text: string) => {
  const slugText = removeVietnameseDiacritics(text);
  return ld.kebabCase(slugText);
};
