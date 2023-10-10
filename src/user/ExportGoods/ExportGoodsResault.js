import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";

export default function ExportGoodsResault({ ExportGoods, filter }) {
  console.log(filter);
  return ExportGoods === undefined || ExportGoods.length === 0 ? (
    <tr>
      <td colSpan={6} className="text-center">
        <b>không có phiếu nhập kho nào...</b>
      </td>
    </tr>
  ) : (
    ExportGoods.map((e, index) => {
      let day = new Date(e.created).toLocaleDateString("en-GB", {
        hour: "numeric",
        minute: "numeric",
      });
      return (
        <tr key={index}>
          <td>{(filter.currentPage - 1) * 10 + index + 1}</td>
          <td>{day}</td>
          <td>{e._id}</td>
          <td>{e.quantity}</td>
          <td>{e.user.firstName + " " + e.user.lastName}</td>
          <td>
            <FontAwesomeIcon icon={faPen} />
          </td>
        </tr>
      );
    })
  );
}
