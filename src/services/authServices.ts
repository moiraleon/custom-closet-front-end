import axios from 'axios';
import { API_BASE_URL } from '../../config';

//Login user after credential validation
export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; 
  }
}

//Register a new user
export async function register(email: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; 
  }
}

//Logout a user and invaludate session tokens
export async function logout() {
  try {
    // Invalidate the user's session/token
    console.log('Logging out...');
    // After successful logout, clear any local session/token data
  } catch (error) {
    console.error('Error logging out:', error);
    throw error; 
  }
}
