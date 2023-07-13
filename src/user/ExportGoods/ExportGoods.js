import React from "react";

import "../../css/export_goods.css";
import "../../css/util.css";

import TableSearch from "./TableSearch";
import TableResault from "./TableResault";

export default function ExportGoods() {
  return (
    <div>
      <TableSearch />
      <TableResault />
    </div>
  );
}
