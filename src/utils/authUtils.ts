// Function to retrieve JWT from storage
export function getHeaders() {
  const JWT = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${JWT}` 
    }
  }
  console.log(config)
    return config;
  }