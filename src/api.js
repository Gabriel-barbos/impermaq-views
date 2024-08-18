// src/api.js
export const fetchProducts = async () => {
    const response = await fetch('https://backend-api-gold-mu.vercel.app/api/products');
    if (!response.ok) {
      throw new Error('Failed em consultar API');
    }
    return await response.json();
  };
  
  export const fetchAdminData = async () => {
    const response = await fetch('https://backend-api-gold-mu.vercel.app/api/admin');
    if (!response.ok) {
      throw new Error('Failed to fetch admin data');
    }
    return await response.json();
  };