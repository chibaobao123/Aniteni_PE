import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import { update_warehouse } from "../../api/warehouse";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddDeleteTableRows from "./AddDeleteTableRows";

export default function CreateNewModal() {
  const { updateWarehouse } = useSelector((state) => state.warehouseReducer);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [goods, setGoods] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    if (updateWarehouse === undefined) {
      console.log("underfined");
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    for (let i = 0; i < updateWarehouse.length; i++) {
      if (
        updateWarehouse[i].products_id === "" ||
        updateWarehouse[i].quantity < 1 ||
        updateWarehouse[i].price < 1
      ) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
    }

    const token = JSON.parse(
      localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN)
    )[0];

    update_warehouse(updateWarehouse, token).then((res) => {
      console.log(res.data.data);
      dispatch({
        type: "ALL_WAREHOUSE_UPDATE",
        warehouseUpdate: res.data.data,
        currentPage: res.data.currentPage,
        length: res.data.length,
      });
      alert("Cập nhật thành công !!!");
      setShow(false);
    });
  };

  return (
    <div className="col-lg-2">
      <Button variant="primary" onClick={handleShow}>
        Thêm mới <FontAwesomeIcon icon={faPlus} className="p-l-8" />
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Phiếu nhập hàng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddDeleteTableRows />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Tạo mới
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
