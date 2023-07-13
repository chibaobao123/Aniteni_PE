import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "../../css/login/login.css";
import "../../css/util.css";

import { loginUser } from "../../api/users";

import logo from "../../assets/img/logo.png";
import backgroundLogin from "../../assets/img/blob-scene-haikei.png";

export default function Login(props) {
  const userLoginRef = useRef({
    TaiKhoan: "",
    MatKhau: "",
  });

  const [errMsg, setErrMsg] = useState({
    TaiKhoan: "",
    MatKhau: "",
  });

  const [className, setClassName] = useState({
    TaiKhoan: "wrap-input100",
    MatKhau: "wrap-input100",
  });

  const handleChange = (e) => {
    const { value, id, name } = e.target;
    userLoginRef.current[id] = value;

    let newErrors = { ...errMsg };
    let messageError = "";

    if (value.trim() === "") {
      messageError = name + " không được bỏ trống !";
    }

    newErrors[id] = messageError;

    setErrMsg(newErrors);
  };

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

  const handleLogin = async (e) => {
    e.preventDefault();

    const { current } = userLoginRef;

    console.log(current, e.target);

    if (!current.TaiKhoan.includes("@gmail.com")) {
      current.TaiKhoan = current.TaiKhoan + "@gmail.com";
    }

    try {
      let login = loginUser(current);

      login
        .then((res) => {
          //Lưu vào localstorage
          let tokenUserLogin = res.data.tokenUserLogin;
          let tokenUser = res.data.tokenUser;

          let arrToken = [];
          arrToken.push(tokenUser);
          arrToken.push(tokenUserLogin);

          localStorage.setItem(
            process.env.ACCESS_USER_LOGIN_TOKEN,
            JSON.stringify(arrToken)
          );

          setTimeout(() => {
            alert(res.data.message);
            window.location.href = "/";
          }, 100);
        })
        .catch((err) => {
          // console.log(err.response.data)
          alert(err.response.data.message);
        });
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div>
      <div className="limiter">
        <div
          className="container-login100"
          style={{
            backgroundImage: `url(${backgroundLogin})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="wrap-login100 rotate-scale-up">
            <form
              className="login100-form validate-form flip-in-hor-bottom"
              action=""
              method="POST"
              onSubmit={handleLogin}
            >
              <div
                className="login100-form-title m-b-26 m-l-r-auto rotate-in-center"
                style={{ backgroundImage: `url(${logo})` }}
              ></div>
              <div className={className.TaiKhoan}>
                <input
                  className="input100"
                  type="text"
                  id="TaiKhoan"
                  name="Tài Khoản"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={userLoginRef.current.TaiKhoan}
                  required
                />
                <span
                  className="focus-input100"
                  data-placeholder="Tài khoản"
                ></span>
              </div>
              <p className="text-danger p-b-10">{errMsg.TaiKhoan}</p>

              <div className={className.MatKhau}>
                <input
                  className="input100"
                  type="password"
                  id="MatKhau"
                  name="Mật khẩu"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={userLoginRef.current.MatKhau}
                  required
                />
                <span
                  className="focus-input100"
                  data-placeholder="Mật khẩu"
                ></span>
              </div>
              <p className="text-danger p-b-10">{errMsg.MatKhau}</p>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn jello-horizontal"></div>
                  <button
                    className="login100-form-btn jello-horizontal"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>

              <div className="text-center p-t-10 ">
                <Link className="txt2" to={`/register`}>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
