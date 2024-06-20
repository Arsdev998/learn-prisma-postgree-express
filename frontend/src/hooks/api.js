// src/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Fungsi untuk melakukan GET request
export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    throw error;
  }
};

// Fungsi untuk melakukan GET request by ID
export const getById = async (endpoint, id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}/${id}:`, error);
    throw error;
  }
};

// Fungsi untuk melakukan POST request
export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to create at ${endpoint}:`, error);
    throw error;
  }
};

// Fungsi untuk melakukan PATCH request
export const patch = async (endpoint, id, data) => {
  try {
    const response = await api.patch(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to patch at ${endpoint}/${id}:`, error);
    throw error;
  }
};

// Fungsi untuk melakukan DELETE request
export const remove = async (endpoint, id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete at ${endpoint}/${id}:`, error);
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
