import axios from "axios";
import { access } from "fs";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(function (config) {
  const accessToken: string | null = window.localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
export default axiosInstance;
