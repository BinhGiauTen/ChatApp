import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const register = async (user) => {
  const response = await axios.post(`${base_url}auth/register`, user);
  return response.data;
};

const verifyRegister = async (user) => {
  const response = await axios.post(`${base_url}auth/verifyRegister`, user);
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${base_url}auth/login`, user);
  if (response.data) {
    sessionStorage.setItem("User", JSON.stringify(response.data));
  }
  if (response.data.token) {
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const logout = async (id) => {
  const response = await axios.get(`${base_url}auth/logout/${id}`, config);
  return response.data;
};

const authService = {
  verifyRegister,
  register,
  login,
  logout,
};
export default authService;
