import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { search_warehouse_update } from "../../api/warehouse";

export default function TableSearch() {
  const { condition } = useSelector((state) => state.warehouseReducer);
  const dispatch = useDispatch();

  const handleChange = (date, name, e) => {
    // console.log(date, name);
    const { value } = e.target;
    let newSearchInfor = { ...condition };

    if (name === "startDate") {
      newSearchInfor[1].dates.startDate = new Date(
        date.setHours(0, 0, 0, 0, 0)
      );
      if (date > newSearchInfor.endDate) {
        newSearchInfor[1].dates.endDate = new Date(
          date.setHours(0, 0, 0, 0, 0)
        );
      }
    }

    if (name === "endDate") {
      newSearchInfor[1].dates.endDate = new Date(date.setHours(0, 0, 0, 0, 0));
    }

    if (name === "ma") {
      newSearchInfor[1].dates.ma = value;
    }

    dispatch({
      type: "SET_DATES",
      dates: newSearchInfor,
    });
  };

  const handleSubmit = async () => {
    const token = await JSON.parse(
      localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN)
    )[0];

    let newCondition = [...condition];
    newCondition[1].dates.startDate = new Date(
      new Date(newCondition[1].dates.startDate).setHours(0, 0, 0, 0)
    );
    if (newCondition[1].dates.startDate === newCondition[1].dates.endDate) {
      newCondition[1].dates.endDate = new Date(
        new Date(newCondition[1].dates.endDate).setHours(24, 0, 0, 0)
      );
    }

    search_warehouse_update(token, newCondition).then((res) => {
      console.log(res);
      dispatch({
        type: "SEARCH_WAREHOUSE_UPDATE",
        warehouseUpdate: res.data.data,
        length: res.data.length,
        currentPage: res.data.currentPage,
      });
    });
  };

  return (
    <div className="m-4 border rounded bg-white box-shadow">
      <div className="mx-4 my-2 px-2" style={{ fontWeight: "600" }}>
        <p className="border-bottom border-secondary fs-18">Tìm kiếm</p>
      </div>
      <div className="m-4 row">
        <div className="col-sm-4 col-lg-3 col-xl">
          <span>
            <p className="mt-sm-1 mt-xl-0">
              Mã nhập hàng
              <span className="text-danger">*</span>
            </p>
            <div className="row v-flat-pickr-group mx-0 align-items-center">
              <input
                type="text"
                data-input="true"
                placeholder="Nhập mã"
                className="form-control h7"
                onChange={(e) => handleChange("", "ma", e)}
              />
            </div>
            <small className="text-danger"></small>
          </span>
        </div>
        <div className="col-sm-4 col-lg-3 col-xl">
          <span>
            <p className="mt-sm-1 mt-xl-0">
              từ ngày
              <span className="text-danger">*</span>
            </p>
            <div className="row v-flat-pickr-group mx-0 align-items-center">
              <DatePicker
                selected={condition[1].dates.startDate}
                name="startDate"
                onChange={(date, e) => handleChange(date, "startDate", e)}
                className="form-control h7"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <small className="text-danger"></small>
          </span>
        </div>
        <div className="col-sm-4 col-lg-3 col-xl">
          <span>
            <p className="mt-sm-1 mt-xl-0">
              Đến ngày
              <span className="text-danger">*</span>
            </p>
            <div className="row v-flat-pickr-group mx-0 align-items-center">
              <DatePicker
                selected={condition[1].dates.endDate}
                name="endDate"
                onChange={(date, e) => handleChange(date, "endDate", e)}
                className="form-control h7"
                dateFormat="dd/MM/yyyy"
                minDate={condition[1].dates.startDate}
              />
            </div>
            <small className="text-danger"></small>
          </span>
        </div>
        <div className="col-sm-4 col-lg-3 col-xl">
          <div className="text-white" style={{ cursor: "context-menu" }}>
            Tìm kiếm
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Tìm kiếm <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </div>
  );
}
