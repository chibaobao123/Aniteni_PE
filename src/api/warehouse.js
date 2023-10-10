import Axios from "axios";

export const update_warehouse = (data, token) => {
  let promise = Axios({
    method: "POST",
    url: "http://localhost:4000/updateWarehouse",
    data: data,
    headers: {
      authorizationtoken: token,
    },
  });
  return promise;
};

export const warehouse_update = (token, page, limit) => {
  let promise = Axios({
    method: "GET",
    url: "http://localhost:4000/warehouseUpdate/" + page + "&" + limit,
    limit: limit,
    headers: {
      authorizationtoken: token,
    },
  });
  return promise;
};

export const warehouse_update_detail = (token, id) => {
  let promise = Axios({
    method: "GET",
    url: "http://localhost:4000/warehouseUpdateDetail?id=" + id,
    headers: {
      authorizationtoken: token,
    },
  });
  return promise;
};

export const search_warehouse_update = (token, data) => {
  let promise = Axios({
    method: "POST",
    url: "http://localhost:4000/searchWarehouseUpdate",
    data: data,
    headers: {
      authorizationtoken: token,
    },
  });
  return promise;
};
