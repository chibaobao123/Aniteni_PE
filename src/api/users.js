import Axios from "axios";

export const userRegistration = (data) => {
  let promise = Axios({
    method: "POST",
    url: "http://localhost:4000/userRegistration",
    data: { data },
  });

  return promise;
};

export const getUsers = () => {
  let result = Axios({
    method: "GET",
    url: "http://localhost:4000/getUsers",
  });
  return result;
};

export const checkJWT = (token) => {
  let promise = Axios({
    method: "POST",
    url: "http://localhost:4000/checkJWT",
    headers: {
      authorizationtoken: token,
    },
  });
  return promise;
};

export const loginUser = (data) => {
  let promise = Axios({
    method: "POST",
    url: "http://localhost:4000/userLogin",
    data: { data },
  });
  return promise;
};

export const logOutUser = (token) => {
  let promise = Axios({
    method: "POST",
    url: "http://localhost:4000/userLogOut",
    headers: {
      authorizationtoken: token,
    },
  });
  promise.then((res) => {
    console.log(res);
    localStorage.clear();
    window.location.href = "/";
  });
  promise.catch((err) => {
    console.log(err);
  });
};

export const getUserOwner = (token) => {
  let result = Axios({
    method: "GET",
    url: "http://localhost:4000/getUserOwner/",
    headers: {
      authorizationtoken: token,
    },
  });
  return result;
};

export const searchUsers = (data) => {
  let promise = Axios({
    method: "GET",
    url: "http://localhost:4000/getSearchUsers/" + data,
  });

  return promise;
};

export const createNewCustomer = (data) => {
  let promise = Axios({
    method: "POST",
    url: "http://localhost:4000/createNewCustomer",
    data: data,
  });

  return promise;
};
