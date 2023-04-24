import axiosClient from "../axiosClient";

import { getRequestHeaders } from "../../../utils/requestUtils";

/**
  Se hace la request al backend para obtener la lista de varantes de un producto 
  en específico.

	@param {object} queryObj objecto que contiene la página que se quiere traer y
  el id del producto.
*/
export const getVariants = (objQuery) => {
  const queryString = new  URLSearchParams(objQuery).toString();
  const config = getRequestHeaders();

  return axiosClient.get(`/variants?${queryString}`, config)
    .then((res) => res.data)
    .catch((err) => console.error(err));    
};