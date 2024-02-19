import axios from 'axios';
import { API_BASE_URL } from '../../config';

//Fetch user data by id
export async function createProduct(body: Object) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/products/createProduct`,body);
    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; 
  }
}

//Fetch all user products by id
export async function getUserProducts(userId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/getAllUserProducts/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching user products:', error);
    throw error; 
  }
}