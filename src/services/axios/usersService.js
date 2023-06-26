import axios from "axios";

import { LS_KEYS } from "../../assets/constants/constants";
import { creatingUser } from "../../helpers/sweetalert";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

/**
  Se hace la request al backend para obtener una página de usuarios.

  @param {object} queryObj objecto que contiene la página que se quiere traer.
*/
export const getUsers = async (queryObj) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  const queryString = new URLSearchParams(queryObj).toString();

  const res = await axiosClient.get(`/users?${queryString}`, {
    headers: { "Authorization": userToken },
  })
  return res.data;
};

/**
  Se hace la request al backend para obtener el detalle completo del usuario.

  @param {number} id id del usuario a buscar.
*/
export const getUser = async (id) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  const res = await axiosClient.get(`/users/${id}`, {
    headers: { "Authorization": userToken },
  })
  return res.data;
};

export const updateUser = async (id, updatedUser) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  const res = await axiosClient.put(`/users/${id}`, updatedUser, {
    headers: {
      "Authorization": userToken,
    },
  })
  return res.data;
};

export const deleteUser = async (id) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  const res = await axiosClient.delete(`/users/${id}`, {
    headers: { "Authorization": userToken },
  })
  return res
}

export const createUser = async (newUser) => {
  const userToken = localStorage.getItem(LS_KEYS.userToken);

  creatingUser();
  const res = await axiosClient.post("/users/signup", newUser, {
    headers: {
      "Authorization": userToken,
    },
  })
  return res.data;
}