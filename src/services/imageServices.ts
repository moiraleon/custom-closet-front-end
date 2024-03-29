import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { getHeaders } from '../utils/authUtils';

//Fetch user avatar by id
export async function getUserAvatar(userId: string) {
    try {
      const headers = getHeaders()
      const response = await axios.get(`${API_BASE_URL}/api/images/getAvatar/${userId}`, headers);
      return response.data;
    } catch (error:any) {
      console.error('Error fetching user:', error);
      throw error; 
    }
}

//Update user avatar by id
export async function updateUserAvatar(userId: string, userData: any) {
  try {
    const headers = getHeaders()
    const response = await axios.put(`${API_BASE_URL}/api/images/updateAvatar/${userId}`, userData, headers);
    return response.data;
  } catch (error:any) {
    console.error('Error updating user:', error);
    throw error; 
  }
}

//Retrieve Single Use Image Kit Token
export async function retrieveSingleUseToken() {
  try {
    const headers = getHeaders()
    const response = await axios.get(`${API_BASE_URL}/api/images/auth`, headers);
    return response.data;
  } catch (error:any) {
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
    return response;
  } catch (error:any) {
    console.error('Error uploading image:', error);
    throw error;
  }
}