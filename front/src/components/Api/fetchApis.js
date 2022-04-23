import axios from "axios";
import { baseApi } from "./baseApi";

export const fetchSignUp = async (userData) => {
  const response = await axios
    .post(`${baseApi}/api/v1/users`, userData)
    .then()
    .catch();
  return response;
};

export const fetchLogin = async (userData) => {
  console.log("login api func", userData);
  const response = await axios
    .post(`${baseApi}/api/v1/users/login`, userData)
    .then()
    .catch();
  return response;
};
