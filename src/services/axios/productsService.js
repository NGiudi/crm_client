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

  const queryString = new  URLSearchParams(queryObj).toString();

	return axiosClient.get(`/products?${queryString}`, {
    headers: { "Authorization": userToken},
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
    headers: { "Authorization": userToken},
  })
    .then((res) => res.data);
};