import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import "./App.css";

import Home from "./user/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./user/Login/Login";
import Register from "./user/Register/Register";
import Warehouse from "./user/Warehouse/Warehouse";
import HomePage from "./user/Home/HomePage";
import AuthWrapper from "./user/utils/AuthWrapper";
import ExportGoods from "./user/ExportGoods/ExportGoods";
import Goods from "./user/Goods/Goods";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);

  //   const token = JSON.parse(
  //     localStorage.getItem(process.env.ACCESS_USER_LOGIN_TOKEN)
  //   );

  //   if (token === null) {
  //     setIsSignedIn(false);
  //   } else {
  //     checkJWT(token[0]).then((res) => {
  //       res.data.message ? setIsSignedIn(true) : setIsSignedIn(false);
  //     });
  //   }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Trang mặc định luôn nằm dưới cùng */}
        <Route element={<AuthWrapper isSignedIn={isSignedIn} />}>
          <Route path="/" element={<HomePage />}>
            <Route index element={<Home />} />
            <Route path="warehouse" element={<Warehouse />} />
            <Route path="goods" element={<Goods />} />
            <Route path="exportgoods" element={<ExportGoods />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
