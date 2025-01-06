import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type PaginationMeta = {
  currentPage: number;
  lastPage: number;
  totalRecords: number;
};

export interface ApiResponse<T = any, P = false> {
  data: T;
  message: string;
  meta?: P extends true ? PaginationMeta : undefined;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      // Redirect to login when sessions is not valid
      if (window) {
        // window.location.href = "/app/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
