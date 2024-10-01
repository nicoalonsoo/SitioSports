import axios from "axios";

export const fetchProductsFromBackend = async () => {
  try {
    const response = await axios.get("https://sitiosports-production.up.railway.app/products");
    return response.data; 
  } catch (error) {
    throw error;
  }
};
export const fetchProductBySlugFromBackend = async (slug) => {
  try {
    const response = await axios.get(`https://sitiosports-production.up.railway.app/products/${slug}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchUsersFromBackend = async () => {
  try {
    const response = await axios.get("https://sitiosports-production.up.railway.app/users");
    return response.data; 
  } catch (error) {
    throw error;
  }
};
export const fetchDiscountsFromBackend = async () => {
  try {
    const response = await axios.get("https://sitiosports-production.up.railway.app/discounts");
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchOrdersFromBackend = async () => {
  try {
    const response = await axios.get("https://sitiosports-production.up.railway.app/orders");
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchCommissionsFromBackend = async () => {
  try {
    const response = await axios.get("https://sitiosports-production.up.railway.app/commissions");
    return response.data; 
  } catch (error) {
    throw error;
  }
};

//https://sitiosports-production.up.railway.app/

//https://sitiosports-production.up.railway.app/

const API_URL = 'https://sitiosports-production.up.railway.app'; // Cambia esto a tu URL del backend

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};


const getAuthHeaders = () => {
  const token = localStorage.getItem('userToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProtectedData = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch protected data');
  }
};
