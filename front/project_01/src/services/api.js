import axios from "axios";

// 🔹 Instância base
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// 🔹 Interceptor (envia token automático)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔹 LOGIN com username + password
export const login = async (username, password) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/token/",
      {
        username,
        password,
      }
    );

    const { access, refresh, role } = response.data;

    // 🔐 salva tokens
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    // 🔹 salva role (IMPORTANTE)
    if (role) {
      localStorage.setItem("role", role);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// 🔹 LOGOUT
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
};

// 🔹 pegar role
export const getRole = () => {
  return localStorage.getItem("role");
};

// 🔹 verificar login
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

export default api;