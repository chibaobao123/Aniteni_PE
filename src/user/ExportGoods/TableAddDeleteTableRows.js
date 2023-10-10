import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getProducts } from "../../api/products";

import TableRows from "./TableRows";

export default function TableAddDeleteTableRows() {
  const { rowsData, validate } = useSelector(
    (state) => state.exportGoodsReducer
  );
  const dispatch = useDispatch();

  const [products, setProducts] = useState([
    {
      value: "-1",
      label: "Đang tải...",
    },
  ]);

  useEffect(() => {
    getProducts().then((res) => {
      if (res.data.products.length === 0) {
        setProducts([
          { value: "-1", label: "Không tìm thấy người dùng nào !!!" },
        ]);
      } else {
        let arr = [];
        res.data.products.map((e) => {
          let obj = {
            value: `${e._id}`,
            label: `${e.name}`,
            warehouse: `${e.quantity}`,
          };
          arr.push(obj);
        });
        setProducts(arr);
      }
    });
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "60%" }}>Sản phẩm</th>
          <th style={{ width: "30%" }}>Số lượng(cái)</th>
          <th style={{ width: "10%" }}>
            <button
              className="btn btn-outline-success"
              onClick={() => dispatch({ type: "ADD_TABLE_ROWS" })}
            >
              +
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRows
          rowsData={rowsData}
          products={products}
          validate={validate}
        />
      </tbody>
    </table>
  );
}
