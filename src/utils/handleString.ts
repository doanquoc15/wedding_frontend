import innerText from "react-innertext";

export const checkIsIncludeText = (array: any[], valueSearch: string) => {
  return array.filter(
    (item) =>
      innerText(item.label)?.toLowerCase().includes(valueSearch.toLowerCase()) ||
      item.name?.toLowerCase().includes(valueSearch.toLowerCase()) ||
      item.shortName?.toLowerCase().includes(valueSearch.toLowerCase())
  );
};
