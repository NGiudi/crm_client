import axios from "axios";

import { LS_KEYS } from "../../assets/constants/constants";

const axiosClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/sales`,
});

/**
  Se hace la request al backend para crear una nueva venta.

	@param {number} id id del producto a buscar.
*/
export const createSale = (saleObj) => {
	const userToken = localStorage.getItem(LS_KEYS.userToken);

	return axiosClient.post("", saleObj, {
		headers: { "Authorization": userToken },
	})
		.then((res) => res.data);
};

/**
  Se hace la request al backend para obtener una página de ventas.

	@param {object} queryObj objecto que contiene la página que se quiere traer.
*/
export const getSales = (queryObj) => {
	const userToken = localStorage.getItem(LS_KEYS.userToken);

	const queryString = new URLSearchParams(queryObj).toString();

	return axiosClient.get(`?${queryString}`, {
		headers: { "Authorization": userToken },
	})
		.then((res) => res.data);
};

/**
  Se hace la request al backend para obtener el detalle completo de ventas.

	@param {number} id id del producto a buscar.
*/
export const getSale = (id) => {
	const userToken = localStorage.getItem(LS_KEYS.userToken);

	return axiosClient.get(`/${id}`, {
		headers: { "Authorization": userToken },
	})
		.then((res) => res.data);
};

export const getSalesStats = (sellerId) => {
	const userToken = localStorage.getItem(LS_KEYS.userToken);
  
	return axiosClient.get(`/stats?sellerId=${sellerId}`, {
	  headers: { "Authorization": userToken },
	})
		.then((res) => res.data);
};