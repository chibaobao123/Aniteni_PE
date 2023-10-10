import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { search_warehouse_update, warehouse_update } from "../../api/warehouse";

export default function PageNumbers({ pageNumbers, filter }) {
  const { condition } = useSelector((state) => state.warehouseReducer);
  const dispatch = useDispatch();

  const handleClick = (num) => {
    const token = JSON.parse(
      localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN)
    )[0];

    let newCondition = [...condition];

    newCondition[0].filter.currentPage = num;

    dispatch({
      type: "SET_CONDITION",
      condition: newCondition,
    });

    search_warehouse_update(token, newCondition).then((res) => {
      dispatch({
        type: "SEARCH_WAREHOUSE_UPDATE",
        warehouseUpdate: res.data.data,
        length: res.data.length,
        currentPage: res.data.currentPage,
      });
    });
  };
  return (
    <div className="text-center py-2">
      {pageNumbers.length === 0
        ? ""
        : pageNumbers.map((e, index) => {
            let num = e;
            let borderBottom = "";

            if (e === filter.currentPage) {
              borderBottom = "border-dark border";
            }
            return (
              <button
                className={"btn " + borderBottom}
                key={index}
                onClick={() => handleClick(num)}
              >
                {num}
              </button>
            );
          })}
    </div>
  );
}
