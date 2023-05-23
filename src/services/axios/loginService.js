import axios from "axios";

import { LS_KEYS } from "../../assets/constants/constants";

const axiosClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/users`, 
});

/**
  Se hace la request al backend para autenticar un usuario por medio del
	token almacenado en el localstorage.

	@param {object} data objecto que contiene el token y el id del usuario.
*/
export const userAuthentication = (data) => {
	return axiosClient.post("/authentication", data)
		.then((res) => res.data.user);
};

/**
  Se hace la request al backend para loguear un usuario y 
	guarda el token en el localstorage.

	@param {object} data objecto que contiene el email y la contraseña del usuario.
*/
export const userLogin = (data) => {
	return axiosClient.post("/login", data)
		.then((res) => {
			const user = res.data.user;
			localStorage.setItem(LS_KEYS.userId, user.id);
			localStorage.setItem(LS_KEYS.userToken, user.token);
			return res.data;
		})
};

/**
  Se hace la request al backend para desloguear un usuario y 
	elimina el token guardado en el localstorage.
*/
export const userLogout = () => {
	const userId = localStorage.getItem(LS_KEYS.userId);

	const data = { user_id: userId };

	return axiosClient.post(`/logout`, data)
		.then(() => {
			localStorage.removeItem(LS_KEYS.userId);
			localStorage.removeItem(LS_KEYS.userToken);
		});
};
