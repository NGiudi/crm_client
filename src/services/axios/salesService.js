import axios from "axios";

import { LS_KEYS } from "../../assets/constants/constants";

const axiosClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/sales`,
});

/**
  Se hace la request al backend para crear una nueva venta.

	@param {number} id id del producto a buscar.
*/
export const createSale = async (saleObj) => {
	const userToken = localStorage.getItem(LS_KEYS.userToken);

	const res = await axiosClient.post("", saleObj, {
		headers: { "Authorization": userToken },
	})
	return res.data;
};

/**
  Se hace la request al backend para obtener una página de ventas.

	@param {object} queryObj objecto que contiene la página que se quiere traer.
*/
export const getSales = async (queryObj) => {
	const userToken = localStorage.getItem(LS_KEYS.userToken);

	const queryString = new URLSearchParams(queryObj).toString();

	const res = await axiosClient.get(`?${queryString}`, {
		headers: { "Authorization": userToken },
	})
	return res.data;
};

/**
  Se hace la request al backend para obtener el detalle completo de ventas.

	@param {number} id id del producto a buscar.
*/
export const getSale = async (id) => {
	const userToken = localStorage.getItem(LS_KEYS.userToken);

	const res = await axiosClient.get(`/${id}`, {
		headers: { "Authorization": userToken },
	})
	return res.data
};

export const getSalesStats = async (sellerId) => {
	const userToken = localStorage.getItem(LS_KEYS.userToken);
  
	const res = await axiosClient.get(`/stats?sellerId=${sellerId}`, {
		headers: { "Authorization": userToken },
	  })
	return res.data;
};