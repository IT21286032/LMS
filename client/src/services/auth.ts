// src/services/auth.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Update with your backend URL

// Register function
export const register = async (username: string, email: string, password: string, role: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password, role });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Login function
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, userId, role } = response.data;

    // Save the token, user ID, and role in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to get the logged-in user's role
export const getUserRole = () => {
  return localStorage.getItem('role');
};

// Function to get the logged-in user's ID
export const getUserId = () => {
  return localStorage.getItem('userId');
};

// Function to get the JWT token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Function to log out by clearing localStorage
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
};
