import axiosClient from "../axiosClient";

import { getRequestHeaders } from "../../../utils/requestUtils";
import { getVariants } from "./variants";

/**
  Se hace la request al backend para obtener una página de productos.

	@param {object} queryObj objecto que contiene la página que se quiere traer.
*/
export const getProducts = (queryObj) => {
  const queryString = new  URLSearchParams(queryObj).toString();
  const config = getRequestHeaders();

	return axiosClient.get(`/products?${queryString}`, config)   
    .then((res) => res.data)
		.catch((err) => console.error(err));
};

/**
  Se hace la request al backend para obtener la información de un producto.

	@param {number} id id del producto.
*/
export const getProduct = (id) => {
  const config = getRequestHeaders();

	return axiosClient.get(`/products/${id}`, config)
    .then((res) => ({ product: res.data }))
		.catch((err) => console.error(err));
};

/**
  Se hace la request al backend para obtener la información de un producto 
  junto con las variantes del mismo.

	@param {number} id id del producto.
*/
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