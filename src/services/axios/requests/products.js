import axiosClient from "../axiosClient";

import { getRequestHeaders } from "../../../utils/requestUtils";

export const getProducts = (queryObj) => {
  const queryString = new  URLSearchParams(queryObj).toString();
  const config = getRequestHeaders();

	return axiosClient.get(`/products?${queryString}`, config)   
    .then((res) => res.data)
		.catch((err) => console.error(err));
};
