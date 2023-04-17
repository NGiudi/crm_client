import axiosClient from "../axiosClient";

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