import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";

import CreateNewModal from "./CreateNewModal";
import PageNumbers from "./PageNumbers";
import { useDispatch, useSelector } from "react-redux";
import ExportGoodsResault from "./ExportGoodsResault";
import { export_goods, searchExportGoods } from "../../api/exportGoods";

export default function TableResault() {
  const { ExportGoods, condition } = useSelector(
    (state) => state.exportGoodsReducer
  );

  const dispatch = useDispatch();

  const [pageNumbers, setPageNumbers] = useState([]);

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

    searchExportGoods(token, newCondition).then((res) => {
      console.log(res.data);
      dispatch({
        type: "SEARCH_WAREHOUSE_UPDATE",
        data: res.data.data,
        length: res.data.length,
        currentPage: res.data.currentPage,
      });
    });

    return () => {
      searchExportGoods(token, newCondition).then((res) => {
        console.log(res.data);
        dispatch({
          type: "SEARCH_WAREHOUSE_UPDATE",
          data: res.data.data,
          length: res.data.length,
          currentPage: res.data.currentPage,
        });
      });
    };
  }, []);

  useEffect(() => {
    countPageNumbers(condition[0].filter);
  }, [ExportGoods]);

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
              <th>Số lượng</th>
              <th>Nhân viên</th>
              <th className="br-top-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <ExportGoodsResault
              ExportGoods={ExportGoods}
              filter={condition[0].filter}
            />
          </tbody>
        </Table>
      </div>
      <PageNumbers filter={condition[0].filter} pageNumbers={pageNumbers} />
    </div>
  );
}
