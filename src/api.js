// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ضع هنا رابط السيرفر الخاص بك
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
