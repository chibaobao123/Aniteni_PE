import React from "react";
import Select from "react-select";

export default function TableRows({
  rowsData,
  products,
  deleteTableRows,
  handleChange,
}) {
  return rowsData.map((data, index) => {
    const { quantity } = data;
    return (
      <tr key={index}>
        <td>
          {products.length === 0 ? (
            <select className="form-select" aria-label="Default select example">
              <option disabled defaultValue>
                Không có sản phẩm ...
              </option>
            </select>
          ) : (
            <select
              className="form-select"
              aria-label="Default select example"
              name="product"
              onChange={(evnt) => handleChange(index, evnt)}
            >
              <option defaultValue>Chọn sản phẩm ...</option>
              {products.map((data, index) => {
                return (
                  <option data_id={data._id} price={data.price} key={index}>
                    {data.name.length <= 50
                      ? data.name
                      : data.name.slice(0, 50) + " ..."}
                  </option>
                );
              })}
              )
            </select>
          )}
        </td>
        <td>
          <input
            type="number"
            defaultValue={quantity}
            onChange={(evnt) => handleChange(index, evnt)}
            name="quantity"
            className="form-control"
          />
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}
