import React from "react";
import moment from "moment";

import { formatDecimal } from "@/utils/formatDecimal";
import { LocalStorage } from "@/shared/config/localStorage";

function BookingPDF(props) {
  const { total, data } = props;

  const user = JSON.parse(LocalStorage.get("user") as string);
  return (
    <div>
      <center>
        <h1>Đơn hàng </h1>
        <table
          cellPadding={8}
          style={{ borderCollapse: "collapse" }}
          border={1}
        >
          <tbody>
            <tr>
              <th>Ngày</th>
              <td colSpan={3}>{moment().format("YYYY-MM-DD HH:mm:ss")}</td>
            </tr>
            <tr>
              <th colSpan={4}>Khách hàng</th>
            </tr>
            <tr>
              <th>Tên:</th>
              <td colSpan={3}>{user?.name}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td colSpan={3}>{user?.email}</td>
            </tr>
            <tr>
              <th colSpan={4}>Order Details</th>
            </tr>
            {data?.map((item, ind) =>
              item?.dishes?.map((el, index) => (
                <tr key={index}>
                  <td>{ind + 1}</td>
                  <td>{el?.dishName}</td>
                  <td>{el?.quantity}</td>
                  <td>{formatDecimal(el?.price)}</td>
                </tr>
              ))
            )}
            <tr>
              <th colSpan={3}>Total: {total} VND</th>
              <td>{}</td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default BookingPDF;
