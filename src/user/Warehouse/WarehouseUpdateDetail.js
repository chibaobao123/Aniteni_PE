import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { warehouse_update_detail } from "../../api/warehouse";

export default function WarehouseUpdateDetail({
  show,
  WarehouseUpdate_id,
  handleClose,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (WarehouseUpdate_id === undefined) {
      return;
    }
    const token = JSON.parse(
      localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN)
    )[0];
    if (WarehouseUpdate_id !== "") {
      warehouse_update_detail(token, WarehouseUpdate_id).then((res) => {
        setData(res.data.data);
      });
    }
    return setData([]);
  }, [WarehouseUpdate_id]);

  return (
    <div>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Phiếu nhập chi tiết - {WarehouseUpdate_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr className="text-center">
                  <td colSpan={3}>Không có dữ liệu</td>
                </tr>
              ) : (
                data.map((e, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <span title={e.product.name} id={e.product._id}>
                          {e.product.name.length > 35
                            ? e.product.name.slice(0, 35) + "..."
                            : e.product.name}
                        </span>
                      </td>
                      <td>
                        <input
                          type="number"
                          name="quantity"
                          className="form-control"
                          defaultValue={e.quantity}
                          disabled
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
