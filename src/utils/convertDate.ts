import moment from "moment";

export const formatDateReceivedBooking = (comeInAt: Date, comeOutAt: Date) => {
  const comeInAtDate = moment(comeInAt).format("DD/MM/YYYY");
  const hourComeInAt = moment(comeInAt).format("HH:mm");
  const hourComeOutAt = moment(comeOutAt).format("HH:mm");

  return {
    comeInAtDate,
    hourComeInAt,
    hourComeOutAt,
  };
};