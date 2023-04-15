import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://localhost:3005/", //TODO: ponerlo en una variable de entorno.
});

export default axiosClient;