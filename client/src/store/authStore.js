import { create } from "zustand"; // This import is a state management library
import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/LoginSignup`, { email, password, name });
      set({ user: response.data.user, isAuthenticated: true });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error signing up" });
      if (err.response && err.response.data && err.response.data.message === "User already exists") {
        alert("User already exists. Please try a different email.");
      }
      throw err;
    }
  },

  login: async (email, password) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/LoginSignup`, { email, password });
      set({ user: response.data.user, isAuthenticated: true, error: null });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error logging in" });
      throw err;
    }
  },

  verifyEmail: async (code) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true });
      return response.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Error verifying email" });
      throw err;
    }
  },

  checkAuth: async () => {
    set({ error: null, isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (err) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  logout: async () => {
    try {

      await axios.post(`${API_URL}/logout`);

      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');

      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.error("Logout failed:", err);
      throw err;
    }
  },

  forgotPassword: async (email) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({ message: response?.data?.message });
    } catch (err) {
      throw err;
    }
  },

  resetPassword: async (token, password) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ message: response?.data?.message });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error resetting password" });
      throw err;
    }
  }
}));
