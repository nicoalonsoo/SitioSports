import axios from "axios";
const API_URL = process.env.REACT_APP_BACK_URL;

export const fetchProductsFromBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchProductBySlugFromBackend = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/products/${slug}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchPromotionBySlugFromBackend = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/promotion/${slug}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchUsersFromBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchDiscountsFromBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/discounts`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchPromotionsFromBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/promotion`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchOrdersFromBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchCommissionsFromBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/commissions`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

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
