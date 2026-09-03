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
    //todo make env var usable so we dont have to hardcode urls.. *3
      baseURL: (import.meta.env.VITE_USER_API_URL ?? "https://niklasbodega.lasias.com").replace(/\/+$/, ""),
      withCredentials: true,
  })
);

export const bookingAxios = applyInterceptors(
  axios.create({
    baseURL: (
      import.meta.env.VITE_BOOKING_API_URL ?? 'https://niklasbodega.lasias.com'
    ).replace(/\/+$/, ''),
    withCredentials: true,
  }),
);

export const reviewAxios = applyInterceptors(
  axios.create({
    baseURL: (
      import.meta.env.VITE_REVIEW_API_URL ?? 'https://niklasbodega.lasias.com'
    ).replace(/\/+$/, ''),
    withCredentials: true,
  }),
);