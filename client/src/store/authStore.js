import { create } from "zustand"; // state management library
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
      // Make sure the endpoint matches your backend's route
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

  verifyEmail: async (code) => {
    set({ error: null })
    try{
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true });
      return response.data
    }catch(err){
      set({ error: err.response?.data?.message || "Error verifying email"})
      throw err;
    }
  },

  
}));