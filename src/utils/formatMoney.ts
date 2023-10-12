export const formatMoney = (number : number) => {
  return new Intl.NumberFormat("en-US").format(number);
};
