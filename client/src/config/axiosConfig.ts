import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL =
  import.meta.env.API_BASE_URL || "https://studi-io-5w1z.onrender.com";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.data && config.method !== "get") {
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
        config.timeout = 30000;
      } else if (config.data instanceof URLSearchParams) {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      } else if (
        config.data instanceof ArrayBuffer ||
        config.data instanceof Blob ||
        config.data instanceof File
      ) {
        config.headers["Content-Type"] = "application/octet-stream";
      } else if (typeof config.data === "string") {
        try {
          JSON.parse(config.data);
          config.headers["Content-Type"] = "application/json";
        } catch {
          config.headers["Content-Type"] = "text/plain";
        }
      } else if (typeof config.data === "object") {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(error)
      const status = error.response.status;

      switch (status) {
        case 401:
          console.error("Unauthorized - redirecting to login");
          break;

        case 403:
          console.error("Forbidden - insufficient permissions");
          break;

        case 404:
          console.error("Resource not found");
          break;

        case 413:
          console.error("File too large");
          break;

        case 422:
          console.error("Validation error");
          break;

        case 500:
          console.error("Server error");
          break;

        default:
          console.error(`HTTP Error: ${status}`);
      }
    } else if (error.request) {
      console.error("Network error - check your connection");
    }

    return Promise.reject(error);
  }
);

export default api;
