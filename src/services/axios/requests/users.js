import axiosClient from "../axiosClient";

import { getRequestHeaders } from "../../../utils/requestUtils";

/**
  Se hace la request al backend para obtener la lista de usuarios. Únicamente 
  los administradores tiene acceso al mismo.

	@param {object} queryObj objecto que contiene la página que se quiere traer.
*/
export const getUsers = (queryObj) => {
  const queryString = new  URLSearchParams(queryObj).toString();
  const config = getRequestHeaders();

	return axiosClient.get(`/users?${queryString}`, config)
    .then((res) => res.data)
		.catch((err) => console.error(err));
};
