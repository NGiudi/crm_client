import axios from "axios";

import { LS_KEYS } from "../../assets/constants/constants";

const userToken = localStorage.getItem(LS_KEYS.userToken);

const axiosClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: { "Authorization": userToken},
});

/**
  Se hace la request al backend para obtener una página de productos.

	@param {object} queryObj objecto que contiene la página que se quiere traer.
*/
export const getProducts = (queryObj) => {
  const queryString = new  URLSearchParams(queryObj).toString();

	return axiosClient.get(`/products?${queryString}`)   
    .then((res) => res.data);
};
