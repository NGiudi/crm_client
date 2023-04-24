import axiosClient from "../axiosClient";

/**
  Se hace la request al backend para loguear un usuario y 
	guarda el token en el localstorage.

	@param {object} data objecto que contiene el email y la contraseña del usuario.
*/
export const userLogin = (data) => {
	return axiosClient.post("/users/login", data)
		.then((res) => {
			const user = res.data.user;
			localStorage.setItem("crm_user_token", user.token);
			localStorage.setItem("crm_user_id", user.id);
			return res.data;
		})
		.catch((err) => console.error(err));
};

/**
  Se hace la request al backend para desloguear un usuario y 
	elimina el token guardado en el localstorage.
*/
export const userLogout = () => {
	const userId = localStorage.getItem("crm_user_id");

	const data = { user_id: userId };

	return axiosClient.post(`/users/logout`, data)
		.then(() => {
			localStorage.removeItem("crm_user_id");
			localStorage.removeItem("crm_user_token");
		})
		.catch((err) => console.error(err));
};

/**
  Se hace la request al backend para autenticar un usuario por medio del
	token almacenado en el localstorage.

	@param {object} data objecto que contiene el token y el id del usuario.
*/
export const userAuthentication = (data) => {
	return axiosClient.post("/users/authentication", data)
		.then((res) => {
			if (!res.data.user) {
				localStorage.removeItem("crm_user_id");
				localStorage.removeItem("crm_user_token");
			}

			return res.data.user;
		})
		.catch((err) => console.error(err));
};