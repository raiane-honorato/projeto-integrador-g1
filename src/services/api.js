import axios from "axios";

const api = axios.create({
  baseURL: 'http://34.69.179.92:8080/',
});

api.interceptors.request.use(async config => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
