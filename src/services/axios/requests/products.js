import axiosClient from "../axiosClient";

import { getRequestHeaders } from "../../../utils/requestUtils";
import { getVariants } from "./variants";

export const getProducts = (queryObj) => {
  const queryString = new  URLSearchParams(queryObj).toString();
  const config = getRequestHeaders();

	return axiosClient.get(`/products?${queryString}`, config)   
    .then((res) => res.data)
		.catch((err) => console.error(err));
};

export const getProduct = (id) => {
  const config = getRequestHeaders();

	return axiosClient.get(`/products/${id}`, config)
    .then((res) => ({ product: res.data }))
		.catch((err) => console.error(err));
};

export const getProductWithVariants = (id) => {
  const variantQueryObj = {
    product_id: id,
  }
  
  const requestArray = [
    getProduct(id),
    getVariants(variantQueryObj).then((res) =>({
      variants: res.variants,
      variants_stats: res.stats,
    })),
  ];

  return Promise.all(requestArray)
    .then((values) => {
      return Object.assign(values[0], values[1]);
    })
    .catch((err) => console.error(err));    
};