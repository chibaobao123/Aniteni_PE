import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import WarehouseUpdateDetail from "./WarehouseUpdateDetail";

export default function WarehouseUpdate({ warehouseUpdate, currentPage }) {
  const dispatch = useDispatch();

  const handleShow = (id) => {
    dispatch({
      type: "SHOW_WAREHOUSE_UPDATE_DETAIL",
      id: id,
    });
  };

  return warehouseUpdate === undefined || warehouseUpdate.length === 0 ? (
    <tr>
      <td colSpan={7} className="text-center">
        <b>không có phiếu nhập kho nào...</b>
      </td>
    </tr>
  ) : (
    warehouseUpdate.map((e, index) => {
      let day = new Date(e.created).toLocaleDateString("en-GB", {
        hour: "numeric",
        minute: "numeric",
      });
      return (
        <tr onClick={() => handleShow(e._id)} key={index}>
          <td>{(currentPage - 1) * 10 + index + 1}</td>
          <td>{day}</td>
          <td>{e._id}</td>
          <td className="text-center">{e.quantity}</td>
          <td className="text-center">{e.total}</td>
          <td className="text-center">
            {e.user.firstName + " " + e.user.lastName}
          </td>
          <td className="text-center">
            <FontAwesomeIcon icon={faPen} />
          </td>
        </tr>
      );
    })
  );
}
