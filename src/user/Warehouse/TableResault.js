import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { search_warehouse_update, warehouse_update } from "../../api/warehouse";

import Table from "react-bootstrap/Table";

import CreateNewModal from "./CreateNewModal";
import WarehouseUpdate from "./WarehouseUpdate";
import WarehouseUpdateDetail from "./WarehouseUpdateDetail";
import PageNumbers from "./PageNumbers";

export default function TableResault() {
  const { warehouseUpdate, showWarehouseUpdatDetail, condition } = useSelector(
    (state) => state.warehouseReducer
  );

  const dispatch = useDispatch();

  const [pageNumbers, setPageNumbers] = useState([]);

  const handleClose = () => {
    dispatch({
      type: "SET_SHOW_WAREHOUSE_UPDATE_DETAIL_FALSE",
    });
  };

  const countPageNumbers = (filter) => {
    const { length, limit } = filter;
    let arr = [];

    for (let i = 1; i <= Math.ceil(length / limit); i++) {
      arr.push(i);
    }

    setPageNumbers(arr);
  };
  useEffect(() => {
    const token = JSON.parse(
      localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN)
    )[0];

    let newCondition = [...condition];
    newCondition[1].dates.startDate = new Date(
      new Date(newCondition[1].dates.startDate).setHours(0, 0, 0, 0)
    );
    newCondition[1].dates.endDate = new Date(
      new Date(newCondition[1].dates.endDate).setHours(24, 0, 0, 0)
    );

    search_warehouse_update(token, newCondition).then((res) => {
      dispatch({
        type: "SEARCH_WAREHOUSE_UPDATE",
        warehouseUpdate: res.data.data,
        length: res.data.length,
        currentPage: res.data.currentPage,
      });
    });

    return () => {
      search_warehouse_update(token, newCondition).then((res) => {
        dispatch({
          type: "SEARCH_WAREHOUSE_UPDATE",
          warehouseUpdate: res.data.data,
          length: res.data.length,
          currentPage: res.data.currentPage,
        });
      });
    };
  }, []);

  useEffect(() => {
    countPageNumbers(condition[0].filter);
  }, [warehouseUpdate]);

  return (
    <div className="m-4 border rounded bg-white box-shadow">
      <div className="p-2 row">
        <div className="col-lg-10">
          <span className="d-flex align-items-center h-100 px-4">
            <b>Danh sách phiếu nhập hàng</b>
          </span>
        </div>
        <CreateNewModal />
      </div>
      <div className="mx-4 my-2 box-shadow">
        <Table hover className="table_resault">
          <thead className="table-dark">
            <tr>
              <th className="br-top-left">#</th>
              <th>Ngày</th>
              <th>Mã</th>
              <th className="text-center">Số lượng</th>
              <th className="text-center">Số tiền</th>
              <th className="text-center">Người tạo</th>
              <th className="br-top-right text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <WarehouseUpdate
              warehouseUpdate={warehouseUpdate}
              currentPage={condition[0].filter.currentPage}
            />
          </tbody>
        </Table>
        {/* Modal */}
        <WarehouseUpdateDetail
          WarehouseUpdate_id={showWarehouseUpdatDetail.id}
          show={showWarehouseUpdatDetail.show}
          handleClose={handleClose}
        />
        <PageNumbers pageNumbers={pageNumbers} filter={condition[0].filter} />
      </div>
    </div>
  );
}
