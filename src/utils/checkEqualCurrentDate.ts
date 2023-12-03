import moment from "moment";

export const checkEqualCurrentDate = (date: any) => {
  if (!date) return;
  const providedDate = moment(date);
  const currentDate = moment();
  if (currentDate.isSame(providedDate, "day")) {
    return true;
  } else {
    return false;
  }
};