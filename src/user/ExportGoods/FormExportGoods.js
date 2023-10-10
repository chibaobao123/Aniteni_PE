import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";

import { getUsers } from "../../api/users";

export default function FormExportGoods() {
  const { validate, InformationValidate } = useSelector(
    (state) => state.exportGoodsReducer
  );
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());

  const [options, setOptions] = useState([
    {
      value: "-1",
      label: "Đang tải...",
    },
  ]);

  useEffect(() => {
    getUsers().then((res) => {
      if (res.data.data.length === 0) {
        setOptions([
          { value: "-1", label: "Không tìm thấy người dùng nào !!!" },
        ]);
      } else {
        let arr = [];
        res.data.data.map((e) => {
          let obj = {
            value: `${e._id}`,
            label: `${e.firstName + " " + e.lastName}`,
          };
          arr.push(obj);
        });
        setOptions(arr);
      }
    });
  }, []);
  return (
    <div>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Người xuất hàng</label>
          <Select
            className="basic-single"
            name="color"
            isSearchable={true}
            options={options}
            onChange={(selectedOption) => {
              dispatch({
                type: "SET_USER_EXPORT_GOODS",
                user: selectedOption.value,
              });
            }}
            autoFocus={true}
            placeholder="Chọn nhân viên xuất hàng ..."
          />
          {InformationValidate._id === "" ? (
            ""
          ) : (
            <small className="text-danger">{InformationValidate._id}</small>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label d-block">
            Ngày xuất
          </label>
          <DatePicker
            selected={date}
            name="startDate"
            onChange={(date) => {
              dispatch({
                type: "SET_DATE_EXPORT_GOODS",
                date: date,
              });
            }}
            className="form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </form>
    </div>
  );
}
