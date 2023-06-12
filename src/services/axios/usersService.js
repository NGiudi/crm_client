import axios from "axios";

import { LS_KEYS } from "../../assets/constants/constants";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

/**
  Se hace la request al backend para obtener una página de usuarios.

  @param {object} queryObj objecto que contiene la página que se quiere traer.
*/
export const getUsers = (queryObj) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  const queryString = new URLSearchParams(queryObj).toString();

  return axiosClient.get(`/users?${queryString}`, {
    headers: { "Authorization": userToken },
  })
    .then((res) => res.data);
};

/**
  Se hace la request al backend para obtener el detalle completo del usuario.

  @param {number} id id del usuario a buscar.
*/
export const getUser = (id) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  return axiosClient.get(`/users/${id}`, {
    headers: { "Authorization": userToken },
  })
    .then((res) => res.data);
};

export const updateUser = (id, updatedUser) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  return axiosClient.put(`/users/${id}`, updatedUser, {
    headers: {
      "Authorization": userToken,
    },
  })
    .then((res) => res.data);
};

export const deleteUser = async (id) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  return axiosClient.delete(`/users/${id}`, {
    headers: { "Authorization": userToken },
  })
    .then(() => console.log("Usuario borrado"));
}

export const createUser = (newUser) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  return axiosClient.post("/users/signup", newUser, {
    headers: {
      "Authorization": userToken,
    },
  })
    .then((res) => res.data);
}