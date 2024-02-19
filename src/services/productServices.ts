import axios from 'axios';
import { API_BASE_URL } from '../../config';

//Fetch user data by id
export async function createProduct(body: Object) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/products/createProduct`,body);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; 
  }
}