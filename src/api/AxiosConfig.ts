import axios, { type AxiosInstance } from 'axios';

// Hjälpfunktion för att lägga till er interceptor på en instans
const applyInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use((config) => {
        const csrfToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("XSRF-TOKEN="))
          ?.split("=")[1];

        if (csrfToken) {
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }
        return config;
    });
    return instance;
};

// Skapa och exportera instanser för de olika tjänsterna
export const userAxios = applyInterceptors(
  axios.create({
      baseURL: (import.meta.env.VITE_USER_API_URL || "http://localhost:8084").replace(/\/+$/, ""),
      withCredentials: true,
  })
);

export const bookingAxios = applyInterceptors(
  axios.create({
      baseURL: (import.meta.env.VITE_BOOKING_API_URL || "http://localhost:8083").replace(/\/+$/, ""),
      withCredentials: true,
  })
);

export const reviewAxios = applyInterceptors(
  axios.create({
      baseURL: (import.meta.env.VITE_REVIEW_API_URL || "http://localhost:8086").replace(/\/+$/, ""),
      withCredentials: true,
  })
);