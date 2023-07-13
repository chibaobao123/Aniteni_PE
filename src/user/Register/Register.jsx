import React, { useState } from "react";
import { userRegistration } from "../../api/users";
import { Link } from "react-router-dom";

import "../../css/register/register.css";
import "../../css/util.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/img/logo.png";
import backgroundRegister from "../../assets/img/wave-haikei.png";

export default function Register() {
  const [errMsg, setErrMsg] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    diaChi: "",
    TaiKhoan: "",
    MatKhau: "",
    NhapLaiMatKhau: "",
  });

  const [userLogin, setUserLogin] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    diaChi: "",
    TaiKhoan: "",
    MatKhau: "",
  });

  const [className, setClassName] = useState({
    firstName: "wrap-input100",
    lastName: "wrap-input100",
    phone: "wrap-input100",
    diaChi: "wrap-input100",
    TaiKhoan: "wrap-input100",
    MatKhau: "wrap-input100",
    NhapLaiMatKhau: "wrap-input100",
  });

  const handleBlur = (e) => {
    const { value, id } = e.target;

    let newClassName = { ...className };

    if (value.trim() != "") {
      newClassName[id] = "wrap-input100 has-val";

      setClassName(newClassName);
    } else {
      newClassName[id] = "wrap-input100";

      setClassName(newClassName);
    }
  };

  const handleChange = (e) => {
    const { value, id } = e.target;

    let nameInp = e.target.getAttribute("name");

    //Xử lý values
    let newValues = { ...userLogin };
    newValues[id] = value;
    //Xử lý errors
    let newErrors = { ...errMsg };
    let messageError = "";
    if (value.trim() === "") {
      messageError = id + " không được bỏ trống !";
    }

    if (nameInp === "TaiKhoan") {
      let regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (!regexEmail.test(value)) {
        messageError = "email không đúng định dạng !";
      }
    }

    if (nameInp === "phone") {
      let regexPhone = /^(\s*|(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b)$/;

      if (!regexPhone.test(value)) {
        messageError = "Số điện thoại không đúng định dạng !";
      }
    }

    if (nameInp === "MatKhau") {
      if (value.length <= 9) {
        messageError = "Mật khẩu phải có ít nhất 9 ký tự !";
      }

      let lowerCaseLetters = /[a-z]/g;
      if (!value.match(lowerCaseLetters)) {
        messageError = "Mật khẩu phải có ký tự viết thường !";
      }

      var upperCaseLetters = /[A-Z]/g;
      if (!value.match(upperCaseLetters)) {
        messageError = "Mật khẩu phải có ký tự viết hoa !";
      }

      var numbers = /[0-9]/g;
      if (!value.match(numbers)) {
        messageError = "Mật khẩu phải có ký tự viết số !";
      }
    }

    newErrors[id] = messageError;

    setErrMsg(newErrors);
    setUserLogin(newValues);
  };

  const checkPassword = (e) => {
    const { value, id } = e.target;

    //Xử lý values
    let newValues = { ...userLogin };
    // console.log(newValues)
    //Xử lý errors
    let newErrors = { ...errMsg };
    let messageError = "";

    if (value !== newValues.MatKhau) {
      messageError = "Mật khẩu không khớp !";
    }

    newErrors[id] = messageError;

    setErrMsg(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //Chặn sự kiện reload lại trang của browser
    // console.log(123)
    //Bắt lỗi khi form không hợp lệ sẽ không cho submit
    let err = errMsg;
    let values = userLogin;
    for (let key in err) {
      if (err[key] !== "") {
        alert(`${key} không hợp lệ !`);
        return;
      }
    }

    if (!values.TaiKhoan.includes("@gmail.com")) {
      values.TaiKhoan = values.TaiKhoan + "@gmail.com";
    }

    for (let key in values) {
      if (values[key].trim() === "") {
        //values không điền thị sẽ bị lỗi
        alert(`${key} không hợp lệ !`);
        return;
      }
    }

    // console.log('Đã đăng ký');

    userRegistration(values).then((res) => {
      if (res.data.access) {
        setTimeout(() => {
          alert("Đăng ký thành công !");
          window.location.href = "/";
        }, 100);
      } else {
        alert("Đăng ký thất bại !");
      }
    });
  };

  return (
    <div>
      <div className="limiter">
        <div
          className="container-register100"
          style={{
            backgroundImage: `url(${backgroundRegister})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="wrap-register100 scale-up-center">
            <form
              className="register100-form validate-form flip-in-hor-bottom"
              action=""
              method="POST"
              onSubmit={handleSubmit}
            >
              <div
                className="register100-form-title m-b-26 m-l-r-auto rotate-in-center"
                style={{ backgroundImage: `url(${logo})` }}
              ></div>

              <div className="row">
                <div className="col-lg-2 col">
                  <div className={className.firstName}>
                    <input
                      className="input100"
                      type="text"
                      id="firstName"
                      name="Họ của bạn"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={userLogin.firstName}
                      required
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="Họ"
                    ></span>
                  </div>
                  <p className="text-danger p-b-10">{errMsg.firstName}</p>
                </div>

                <div className="col-lg-5 col">
                  <div className={className.lastName}>
                    <input
                      className="input100"
                      type="text"
                      id="lastName"
                      name="Tên của bạn"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={userLogin.lastName}
                      required
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="Tên"
                    ></span>
                  </div>
                  <p className="text-danger p-b-10">{errMsg.lastName}</p>
                </div>

                <div className="col-lg-5 col-12">
                  <div className={className.phone}>
                    <input
                      className="input100"
                      type="text"
                      id="phone"
                      name="Số điện thoại"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={userLogin.phone}
                      required
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="Số điện thoại"
                    ></span>
                  </div>
                  <p className="text-danger p-b-10">{errMsg.phone}</p>
                </div>

                <div className="col-12">
                  <div className={className.diaChi}>
                    <input
                      className="input100"
                      type="text"
                      id="diaChi"
                      name="Địa chỉ"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={userLogin.diaChi}
                      required
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="Địa chỉ"
                    ></span>
                  </div>
                  <p className="text-danger p-b-10">{errMsg.diaChi}</p>
                </div>

                <div className="col-12">
                  <div className={className.TaiKhoan}>
                    <input
                      className="input100"
                      type="text"
                      id="TaiKhoan"
                      name="Tài khoản"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={userLogin.TaiKhoan}
                      required
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="Tài khoản (gmail)"
                    ></span>
                  </div>
                  <p className="text-danger p-b-10">{errMsg.TaiKhoan}</p>
                </div>

                <div className="col-6">
                  <div className={className.MatKhau}>
                    <input
                      className="input100"
                      type="password"
                      id="MatKhau"
                      name="Mật khẩu"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={userLogin.MatKhau}
                      required
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="Mật khẩu"
                    ></span>
                  </div>
                  <p className="text-danger">{errMsg.MatKhau}</p>
                </div>

                <div className="col-6">
                  <div className={className.NhapLaiMatKhau}>
                    <input
                      className="input100"
                      type="password"
                      id="NhapLaiMatKhau"
                      name="Nhập lại mật khẩu"
                      onChange={checkPassword}
                      onBlur={handleBlur}
                      value={userLogin.NhapLaiMatKhau}
                      required
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="Nhập lại mật khẩu"
                    ></span>
                  </div>
                  <p className="text-danger">{errMsg.NhapLaiMatKhau}</p>
                </div>
              </div>

              <div className="container-register100-form-btn">
                <div className="wrap-register100-form-btn">
                  <div className="register100-form-bgbtn jello-horizontal"></div>
                  <button
                    className="register100-form-btn jello-horizontal"
                    type="submit"
                  >
                    Đăng Ký
                  </button>
                </div>
              </div>

              <div className="text-center p-t-10 ">
                <Link className="txt2" to={`/login`}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    beat
                    className="text-secondary fs-22 p-2 border border-secondary border-2 rounded-circle"
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
