import axios from 'axios';
import { API_BASE_URL } from '../../config';

//Fetch user data by id
export async function getUserById(userId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; 
  }
}

//Fetch user first name by id
export async function getUserFirstNameById(userId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/getFirstName/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; 
    }
}

//Update user first name by id
export async function updateUserFirstNameById(userId: string, userData: any) {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/users/updateFirstName/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
}

//Fetch user last name by id
export async function getUserLastNameById(userId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/getLastName/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; 
    }
}

//Update user last name by id
export async function updateUserLastNameById(userId: string, userData: any) {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/users/updateLastName/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
}