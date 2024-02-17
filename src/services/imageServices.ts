import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

//Fetch user avatar by id
export async function getUserAvatar(userId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/images/getAvatar/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error; 
    }
}

//Update user avatar by id
export async function updateUserAvatar(userId: string, userData: any) {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/images/updateAvatar/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
}