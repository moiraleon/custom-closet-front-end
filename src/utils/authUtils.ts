import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../../config';

// Function to retrieve JWT from storage
export function getHeaders() {
  const JWT = localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Bearer ${JWT}` 
    }
  }
    return config;
  }

// Function to check if token is close to expiration
async function validateTokenExpiration(token: any): Promise<boolean> {
  const decodedToken: any = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
  const currentTime = Date.now();
  const timeUntilExpiration = expirationTime - currentTime;

  const expirationThreshold = 5 * 60 * 1000; // 5 minutes threshold
  return timeUntilExpiration < expirationThreshold;
}

// Function to request new token if current token is close to expiration
async function requestNewToken(refreshToken: string, userId: string): Promise<string | null> {
  try { 
    const response = await axios.post(`${API_BASE_URL}/api/auth/refreshToken`, {
      userId,
      refreshToken
    });
    const { token: newToken } = response.data;
    return newToken;
  } catch (error: any) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

// Function to handle token refresh if needed
export async function handleTokenRefresh(token: any, refreshToken: any, userId: any): Promise<string> {
  if (await validateTokenExpiration(token)) {
    const newToken = await requestNewToken(refreshToken, userId);
    if (newToken) {
      // Token refreshed successfully
      return newToken;
    } else {
      // Error refreshing token, handle as needed (e.g., log out user)
      throw new Error('Error refreshing token');
    }
  } else {
    // Token is not close to expiration, return current token
    return token;
  }
}