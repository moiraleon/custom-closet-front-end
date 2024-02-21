import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import {handleTokenRefresh} from './authUtils';
import { loadingController } from '@ionic/vue';
import eventBus from '../views/eventBus';

// Add Axios request interceptor
axios.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
    // Get the request URL
    const url = config.url;

    // Exclude requests to the refreshToken endpoint to prevent infinite loop
    if (!url?.includes('/api/auth/refreshToken')) {

      // Testing validation of token expiration and retrieval of new token
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      const userId = localStorage.getItem('userId');

      // Await the completion of handleTokenRefresh
      const newToken = await handleTokenRefresh(token, refreshToken, userId);
      
      // Set the new token in the request configuration, and set it in local storage
       config.headers.Authorization = `Bearer ${newToken}`;
       localStorage.setItem('token', newToken);
    }

    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

//Add Axios response interceptor
axios.interceptors.response.use(
    (response: AxiosResponse) => {
      // Handle successful response
      return response;
    },
    (error) => {
      // Handle response error
      console.error('Response Error:', error);
  
      if (error.response && error.response.status === 401 && error.response.data.error === 'Token has expired') {
        eventBus().emitter.emit("session-expired", { time: new Date() });
      }
      
      return Promise.reject(error);
    }
  );
