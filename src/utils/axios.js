import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE; // ya jo bhi tumhara base url hai

const api = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor → har request ke sath token bhejna
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor → 401 aaya to refresh call karo
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(`${BASE_URL}/v1/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.data.accessToken;
        const newRefreshToken = res.data.data.refreshToken;

        // LocalStorage update karo
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Purana request retry karo with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh failed:", err);
        localStorage.clear();
        window.location.href = "/login"; // logout redirect
      }
    }

    return Promise.reject(error);
  }
);

export default api;
