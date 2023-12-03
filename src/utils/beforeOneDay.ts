export const beforeOneDay = (date: Date) => {
  if (!date) return;
  const dateBeforeOneDay = new Date(date);
  dateBeforeOneDay.setDate(dateBeforeOneDay.getDate() - 1);
  return dateBeforeOneDay;
};