import axios from 'axios';
import {toast} from 'react-toastify';
import { host } from './APIRoutes';

const axiosHttp = axios.create({
    baseURL: host,
})

axiosHttp.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('authToken'));
    config.headers.Authorization = token; 
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

axiosHttp.interceptors.response.use(
    (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          toast.error('Unauthorized Access!');
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
)

export default axiosHttp;