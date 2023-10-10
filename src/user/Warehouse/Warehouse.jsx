import React from "react";

import TableSearch from "./TableSearch";
import TableResault from "./TableResault";

import "../../css/util.css";
import "../../css/warehouse.css";

export default function Warehouse() {
  return (
    <div>
      <TableSearch />
      <TableResault />
    </div>
  );
}
