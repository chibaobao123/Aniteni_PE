import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getProducts } from "../../api/products";

import TableRows from "./TableRows";

export default function TableAddDeleteTableRows() {
  const dispatch = useDispatch();

  const [rowsData, setRowsData] = useState([]);

  const [products, setProducts] = useState([
    {
      _id: "sadfasdfas",
      name: "halle",
    },
  ]);

  const addTableRows = () => {
    const rowsInput = {
      product: "",
      quantity: 0,
      price: 0,
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    // console.log(index, name);

    const rowsInput = [...rowsData];

    if (name === "product") {
      rowsInput[index][name] =
        evnt.target[evnt.target.selectedIndex].getAttribute("data_id");
      rowsInput[index]["price"] = Number(
        evnt.target[evnt.target.selectedIndex].getAttribute("price")
      );
    }

    if (name === "quantity") {
      rowsInput[index][name] = Number(value);
    }
    setRowsData(rowsInput);
  };

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "UPDATE_WAREHOUSE",
      update_products: rowsData,
    });
  }, [rowsData]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Số lượng(cái)</th>
          <th>
            <button className="btn btn-outline-success" onClick={addTableRows}>
              +
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRows
          rowsData={rowsData}
          products={products}
          deleteTableRows={deleteTableRows}
          handleChange={handleChange}
        />
      </tbody>
    </table>
  );
}
