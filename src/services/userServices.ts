import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { getHeaders } from '../utils/authUtils';

//Fetch user data by id
export async function getUserById(userId: string) {
  try {
    const headers = getHeaders()
    const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`,headers);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; 
  }
}

//Fetch user first name by id
export async function getUserFirstNameById(userId: string) {
    try {
      const headers = getHeaders()
      const response = await axios.get(`${API_BASE_URL}/api/users/getFirstName/${userId}`,headers);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; 
    }
}

//Update user first name by id
export async function updateUserFirstNameById(userId: string, userData: any) {
  try {
    const headers = getHeaders()
    const response = await axios.put(`${API_BASE_URL}/api/users/updateFirstName/${userId}`, headers, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
}

//Fetch user last name by id
export async function getUserLastNameById(userId: string) {
    try {
      const headers = getHeaders()
      const response = await axios.get(`${API_BASE_URL}/api/users/getLastName/${userId}`,headers);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; 
    }
}

//Update user last name by id
export async function updateUserLastNameById(userId: string, userData: any) {
  try {
    const headers = getHeaders()
    const response = await axios.put(`${API_BASE_URL}/api/users/updateLastName/${userId}`, headers, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
}