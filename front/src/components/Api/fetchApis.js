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
  const response = await axios.post(`${baseApi}/api/v1/users/login`, userData);
  return response;
};

export const fetchForgotPassword = async (userData) => {
  const response = await axios.post(
    `${baseApi}/api/v1/users/forgotPassword`,
    userData
  );
  return response;
};

export const fetchResetPassword = async (userData) => {
  const response = await axios.post(
    `${baseApi}/api/v1/users/forgotPassword/${userData[1]}`,
    userData[0]
  );
  return response;
};
