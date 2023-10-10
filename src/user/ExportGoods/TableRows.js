import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";

export default function TableRows({ rowsData, products, validate }) {
  const dispatch = useDispatch();

  return rowsData.map((data, index) => {
    const { quantity } = data;
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td style={{ width: "60%" }}>
          <Select
            className="basic-single"
            name="color"
            isSearchable={true}
            options={products}
            onChange={(selectedOption) => {
              let obj = {
                type: "GOODS_EXPORT_PRODUCT_ID",
                selectedOption: selectedOption,
                index: index,
              };
              dispatch(obj);
            }}
            autoFocus={true}
            placeholder="Chọn sản phẩm ..."
          />
          {validate[index].product === "" ? (
            ""
          ) : (
            <small className="text-danger">{validate[index].product}</small>
          )}
        </td>
        <td style={{ width: "30%" }}>
          <input
            type="number"
            defaultValue={quantity}
            onChange={(e) => {
              let obj = {
                type: "GOODS_EXPORT_QUANTITY",
                quantity: e.target.value,
                index: index,
              };
              dispatch(obj);
            }}
            name="quantity"
            className="form-control"
          />
          {validate[index].quantity === "" ? (
            ""
          ) : (
            <small className="text-danger">{validate[index].quantity}</small>
          )}
        </td>
        <td style={{ width: "10%" }}>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              dispatch({
                type: "GOODS_EXPORT_DELETE_ROW",
                index: index,
              });
            }}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}
