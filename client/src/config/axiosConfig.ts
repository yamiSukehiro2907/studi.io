import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = "http://localhost:8081/";

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 30000,
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

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
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            const status = error.response.status;

            if (status === 401 && !originalRequest._retry) {
                if (
                    originalRequest.url?.includes("/auth/login") ||
                    originalRequest.url?.includes("/auth/register")
                ) {
                    return Promise.reject(error);
                }

                if (originalRequest.url?.includes("/auth/refresh")) {
                    isRefreshing = false;
                    processQueue(error);
                    localStorage.removeItem("user");
                    if (window.location.pathname !== "/login") {
                        window.location.href = "/login";
                    }
                    return Promise.reject(error);
                }

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({resolve, reject});
                    })
                        .then(() => api(originalRequest))
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    await api.post("/auth/refresh");
                    processQueue();
                    return api(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError);
                    localStorage.removeItem("user");
                    if (window.location.pathname !== "/login") {
                        window.location.href = "/login";
                    }
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            switch (status) {
                case 401:
                    console.error("Unauthorized");
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
