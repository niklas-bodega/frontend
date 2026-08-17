import axios from "axios";

const configuredApiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

export const apiBaseUrl = (
    configuredApiBaseUrl || "http://localhost:8080"
).replace(/\/+$/, "");

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

    if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
    }

    return config;
});

export default axiosInstance;
