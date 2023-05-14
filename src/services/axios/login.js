import axios from "axios";

import { LS_KEYS } from "../../assets/constants/constants";

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL, 
});

/**
  Se hace la request al backend para autenticar un usuario por medio del
	token almacenado en el localstorage.

	@param {object} data objecto que contiene el token y el id del usuario.
*/
export const userAuthentication = (data) => {
	return axiosClient.post("/users/authentication", data)
		.then((res) => res.data.user);
};

/**
  Se hace la request al backend para loguear un usuario y 
	guarda el token en el localstorage.

	@param {object} data objecto que contiene el email y la contraseña del usuario.
*/
export const userLogin = (data) => {
	return axiosClient.post("/users/login", data)
		.then((res) => {
			const user = res.data.user;
			localStorage.setItem(LS_KEYS.userId, user.id);
			localStorage.setItem(LS_KEYS.userToken, user.token);
			return res.data;
		})
};
