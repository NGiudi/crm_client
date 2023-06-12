import axios from "axios";

import { LS_KEYS } from "../../assets/constants/constants";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

/**
  Se hace la request al backend para obtener una página de productos.

  @param {object} queryObj objecto que contiene la página que se quiere traer.
*/
export const getProducts = (queryObj) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  const queryString = new URLSearchParams(queryObj).toString();

  return axiosClient.get(`/products?${queryString}`, {
    headers: { "Authorization": userToken },
  })
    .then((res) => res.data);
};

/**
  Se hace la request al backend para obtener el detalle completo del producto.

  @param {number} id id del producto a buscar.
*/
export const getProduct = (id) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  return axiosClient.get(`/products/${id}`, {
    headers: { "Authorization": userToken },
  })
    .then((res) => res.data);
};

/**
  Se hace la request al backend para borrar el producto.

  @param {number} id id del producto a borrar.
*/
export const deleteProduct = async (id) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  return axiosClient.delete(`/products/${id}`, {
    headers: { "Authorization": userToken },
  })
    .then(() => console.log("Producto borrado"));
}

/**
  Se hace la request al backend para editar el producto.

  @param {number} id id del producto a editar.
  @param {object} updatedData datos del producto modificado.
*/
export const modifyProduct = async (id, updatedData) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);
  return axiosClient.put(`/products/${id}`, updatedData, {
    headers: { "Authorization": userToken },
  })
    .then(() => console.log("Producto modificado"));
}

export const createProduct = (newProducto) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  return axiosClient.post("/products/new", newProducto, {
    headers: {
      "Authorization": userToken,
    },
  })
    .then((res) => res.data);
}