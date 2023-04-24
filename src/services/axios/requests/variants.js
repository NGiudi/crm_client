import axiosClient from "../axiosClient";

import { getRequestHeaders } from "../../../utils/requestUtils";

export const getVariants = (objQuery) => {
  const queryString = new  URLSearchParams(objQuery).toString();
  const config = getRequestHeaders();

  return axiosClient.get(`/variants?${queryString}`, config)
    .then((res) => res.data)
    .catch((err) => console.error(err));    
};