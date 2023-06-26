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
export const userAuthentication = async (data) => {
	const userToken = localStorage.getItem(LS_KEYS.userToken);

	const res = await axiosClient.post("/authentication", data, {
		headers: { "Authorization": userToken },
	})
	return res.data.user;
};

/**
  Se hace la request al backend para loguear un usuario y 
	guarda el token en el localstorage.

	@param {object} data objecto que contiene el email y la contraseña del usuario.
*/
export const userLogin = async (data) => {

	const res = await axiosClient.post("/login", data);
	const user = res.data.user;
	localStorage.setItem(LS_KEYS.userId, user.id);
	localStorage.setItem(LS_KEYS.userToken, user.token);

	return res.data
};

/**
  Se hace la request al backend para desloguear un usuario y 
	elimina el token guardado en el localstorage.
*/
export const userLogout = async () => {
	const userId = localStorage.getItem(LS_KEYS.userId);

	const data = { user_id: userId };

	const res = await axiosClient.post(`/logout`, data)
	localStorage.removeItem(LS_KEYS.userId);
	localStorage.removeItem(LS_KEYS.userToken);

	return res
};
