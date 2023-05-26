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
    headers: { "Authorization": userToken},
  })
    .then((res) => res.data);
};