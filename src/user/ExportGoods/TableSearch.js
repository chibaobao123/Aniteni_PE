import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function TableSearch() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (date, name) => {
    // console.log(date, name);

    if (name === "startDate") {
      setStartDate(date);
      if (date > endDate) {
        setEndDate(date);
      }
    }

    if (name === "endDate") {
      setEndDate(date);
    }
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
                placeholder="Chọn ngày"
                className="form-control h7"
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
                selected={startDate}
                name="startDate"
                onChange={(date) => handleChange(date, "startDate")}
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
                selected={endDate}
                name="endDate"
                onChange={(date) => handleChange(date, "endDate")}
                className="form-control h7"
                dateFormat="dd/MM/yyyy"
                minDate={startDate}
              />
            </div>
            <small className="text-danger"></small>
          </span>
        </div>
        <div className="col-sm-4 col-lg-3 col-xl">
          <div className="text-white" style={{ cursor: "context-menu" }}>
            Tìm kiếm
          </div>
          <button className="btn btn-primary">
            Tìm kiếm <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </div>
  );
}
