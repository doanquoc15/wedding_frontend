export const formatMoney = (number: any) => {
  return new Intl.NumberFormat("en-US").format(number);
};
