import axios from "axios";
import moment from "moment";

const getTimeZone = () => ({
  timeZone: moment().format("Z"),
});
const axiosClient = axios.create({
  headers: {
    ...getTimeZone(),
  },
});

export default axiosClient;
