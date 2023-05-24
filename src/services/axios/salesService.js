import axios from "axios";

const axiosClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
});

/**
  Se hace la request al backend para obtener una página de ventas.

	@param {object} queryObj objecto que contiene la página que se quiere traer.
*/