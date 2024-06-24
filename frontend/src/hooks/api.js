import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Mengizinkan pengiriman cookies
});

export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.log("error get data", error);
    throw error;
  }
};

export const getById = async (endpoint, id) => {
  try {
    const response = await api.get(endpoint, id);
    return response.data;
  } catch (error) {
    console.log("error get detail", error);
    throw error;
  }
};

// Fungsi untuk melakukan POST request
export const post = async (endpoint, data) => {
  try {
    console.log("Sending POST request to:", endpoint, "with data:", data); // Tambahkan logging di sini
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to create at ${endpoint}:`, error);
    throw error;
  }
};

export const remove = async (endpoint, id) => {
  try {
    const response = await api.delete(endpoint, id);
    return response.data;
  } catch (error) {
    console.log("gagal menghapus data", error);
    throw error;
  }
};

// Fungsi untuk melakukan LOGOUT request
export const logoutUser = async (endpoint) => {
  try {
    const response = await api.post(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Failed to logout at ${endpoint}:`, error);
    throw error;
  }
};

export default api;
