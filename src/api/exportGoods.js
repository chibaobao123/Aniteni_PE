import Axios from "axios";

export const export_goods = (token, data) => {
  let promise = Axios({
    method: "POST",
    url: "http://localhost:4000/exportGoods",
    data: data,
    headers: {
      authorizationtoken: token,
    },
  });
  return promise;
};

export const searchExportGoods = (token, data) => {
  let promise = Axios({
    method: "POST",
    data: data,
    url: "http://localhost:4000/searchExportGoods",
    headers: {
      authorizationtoken: token,
    },
  });
  return promise;
};
