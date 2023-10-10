import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormExportGoods from "./FormExportGoods";
import TableAddDeleteTableRows from "./TableAddDeleteTableRows";
import { export_goods } from "../../api/exportGoods";

export default function CreateNewModal() {
  const { rowsData, Information } = useSelector(
    (state) => state.exportGoodsReducer
  );
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch({ type: "CLEAN_ROWSDATA" });
  };

  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    for (let i = 0; i < rowsData.length; i++) {
      if (rowsData[i].product === "") {
        dispatch({
          type: "VALIDATE_PRODUCT_ID",
          index: i,
        });
        return;
      }
      if (rowsData[i].quantity < 1) {
        dispatch({
          type: "VALIDATE_QUANTITY",
          index: i,
        });
        return;
      }
    }

    if (Information._id === "") {
      dispatch({
        type: "SET_USER_EXPORT_GOODS",
        user: "",
      });
      return;
    }

    let data = {
      Information: { ...Information },
      ProductList: [...rowsData],
    };

    const token = JSON.parse(
      localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN)
    )[0];

    export_goods(token, data).then((res) => {
      if (res.data.message === true) {
        setShow(false);

        dispatch({
          type: "EXPORTGOODS",
          data: res.data.data,
        });

        dispatch({
          type: "FILTER",
          filter: {
            limit: 10,
            currentPage: 1,
            length: res.data.length,
          },
        });
      }
    });
  };

  return (
    <div className="col-lg-2">
      <Button variant="primary" onClick={handleShow}>
        Thêm mới <FontAwesomeIcon icon={faPlus} className="p-l-8" />
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Phiếu xuất hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormExportGoods />
          <div style={{ height: "450px", overflow: "auto" }}>
            <TableAddDeleteTableRows />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Xuất hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
