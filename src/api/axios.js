// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// when app starts, if we already have a token, attach it
const token = localStorage.getItem("auth_token");
if (token) {
  // This assumes your simple.token middleware reads the Authorization header
  // e.g. Authorization: Bearer <token>
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
