import React, { useState } from "react";

import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";

export default function TableResault() {
  const [DeliveryBill, setDeliveryBill] = useState([]);

  return (
    <div className="m-4 border rounded bg-white box-shadow">
      <div className="p-2 row">
        <div className="col-lg-10">
          <span className="d-flex align-items-center h-100 px-4">
            <b>Danh sách phiếu nhập hàng</b>
          </span>
        </div>
        <div className="col-lg-2">
          <button className="btn btn-primary">
            Thêm mới <FontAwesomeIcon icon={faPlus} className="p-l-8" />
          </button>
        </div>
      </div>
      <div className="mx-4 my-2 box-shadow">
        <Table hover className="table_resault">
          <thead className="table-dark">
            <tr>
              <th className="br-top-left">#</th>
              <th>Ngày</th>
              <th>Mã</th>
              <th>Số lượng</th>
              <th>Số tiền</th>
              <th className="br-top-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {DeliveryBill.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  <b>không có phiếu nhập kho nào...</b>
                </td>
              </tr>
            ) : (
              DeliveryBill.map((e) => {
                return (
                  <tr>
                    <td>1</td>
                    <td>13/07/2023</td>
                    <td>MHS2211</td>
                    <td>2000</td>
                    <td>400.000.000</td>
                    <td>
                      <FontAwesomeIcon icon={faPen} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
