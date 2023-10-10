import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { getUserOwner, logOutUser } from "../../api/users";

export default function Header() {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [userLogIn, setUserLogIn] = useState(user);

  const getUser = () => {
    const token = JSON.parse(
      localStorage.getItem(process.env.ACCESS_USER_TOKEN)
    );

    getUserOwner(token[0])
      .then((res) => {
        setUserLogIn(res.data.user);
        const action = {
          type: "GET_USER_OWNER",
          value: res.data.user,
        };
        dispatch(action);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async () => {
    const token = JSON.parse(
      localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN)
    );
    logOutUser(token[1]);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-dark">
      <Navbar bg="dark" variant="dark" className="mx-3">
        <Link className="navbar-brand">Kênh bán hàng</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Bán hàng" id="basic-nav-dropdown">
              <Link className="dropdown-item" to="/">
                Bán hàng
              </Link>
              <Link className="dropdown-item" to="#">
                Khách hàng
              </Link>
              <Link className="dropdown-item" to="#">
                Hóa đơn bán hàng
              </Link>
            </NavDropdown>
            <NavDropdown title="Kho" id="basic-nav-dropdown">
              <Link className="dropdown-item" to="/warehouse">
                Nhập hàng
              </Link>
              <Link className="dropdown-item" to="/exportgoods">
                Xuất hàng
              </Link>
              <Link className="dropdown-item" to="#">
                Kiểm kê
              </Link>
            </NavDropdown>
            <NavDropdown title="Báo cáo" id="basic-nav-dropdown">
              <Link className="dropdown-item" to="#">
                Kho
              </Link>
              <Link className="dropdown-item" to="#">
                Hàng trả lại
              </Link>
              <Link className="dropdown-item" to="#">
                Hàng trả lại
              </Link>
            </NavDropdown>
            <NavDropdown title="Hàng hóa" id="basic-nav-dropdown">
              <Link className="dropdown-item" to="/goods">
                Sản phẩm
              </Link>
              {/* <Link className="dropdown-item" to="#">
                
              </Link>
              <Link className="dropdown-item" to="#">

              </Link> */}
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title={userLogIn.TaiKhoan} id="basic-nav-dropdown">
              <Link className="dropdown-item" to="#">
                Thông tin tài khoản
              </Link>
              <Link className="dropdown-item" to="#" onClick={logout}>
                Đăng xuất
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
