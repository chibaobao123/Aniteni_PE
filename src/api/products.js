
import Axios from 'axios';

export const getProducts = () => {
  let promise = Axios({
    method: 'GET',
    url: 'http://localhost:4000/getProducts/',
  })

  return promise
}

export const searchProduct = (data) => {
  let promise = Axios({
    method: 'GET',
    url: 'http://localhost:4000/searchProduct/' + data,
  })

  return promise
}

export const getUnits = () => {
  let promise = Axios({
    method: 'GET',
    url: 'http://localhost:4000/getUnits/',
  })

  return promise
}

export const getCategory = () => {
  let promise = Axios({
    method: 'GET',
    url: 'http://localhost:4000/getCategory/',
  })

  return promise
}

export const add1Product = (formData, token) => {
  let promise = Axios({
    method: 'POST',
    url: 'http://localhost:4000/add1Product',
    data: formData,
    headers: {
      'authorizationtoken': token,
      "Content-Type": "multipart/form-data"
    }
  })
  return promise
}

export const updateProduct = (data, token) => {
  let promise = Axios({
    method: 'PUT',
    url: 'http://localhost:4000/updateProduct',
    data: data,
    headers: {
      'authorizationtoken': token,
    }
  })
  return promise
}
