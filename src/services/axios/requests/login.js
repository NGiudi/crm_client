import axiosClient from "../axiosClient";

export const userLogin = (data) => {
	return axiosClient.post("/users/login", data)
		.then((res) => {
			const user = res.data.user;
			localStorage.setItem("crm_user_token", user.token);
			localStorage.setItem("crm_user_id", user.id);
			return res.data;
		});
};

export const userAuthentication = (data) => {
	return axiosClient.post("/users/authentication", data)
		.then((res) => {
			if (!res.data.user) {
				localStorage.removeItem("crm_user_id");
				localStorage.removeItem("crm_user_token");
			}

			return res.data.user;
		});
};