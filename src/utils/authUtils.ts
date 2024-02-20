// Function to retrieve JWT from storage
export function getHeaders() {
  const JWT = localStorage.getItem('jwt');
  const config = {
    headers: {
      'Authorization': `Bearer ${JWT}` 
    }
  }
    return config;
  }