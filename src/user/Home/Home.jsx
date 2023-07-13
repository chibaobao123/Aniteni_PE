import React from "react";
import SearchProducts from "./SearchProducts";
import TableProducts from "./TableProducts";
import InforBill from "./InforBill";
import "../../css/home.css";

export default function Home() {
  return (
    <div>
      <SearchProducts />
      <div className="row KhachHang">
        <TableProducts />
        <InforBill />
      </div>
    </div>
  );
}
