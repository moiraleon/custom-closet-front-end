import axios from 'axios';
import { API_BASE_URL } from '../../config';

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

//Retrieve Single Use Image Kit Token
export async function retrieveSingleUseToken() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/images/auth`);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
}

//Upload image to imageKtiIO
export async function uploadImageToImageKit(body:FormData) {
  try {
    const response = await axios.post(`https://upload.imagekit.io/api/v1/files/upload`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}