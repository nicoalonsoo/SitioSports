import axios from 'axios';

export const handleAuthToken = async () => {
  const username = 'SitioSport'; // Coloca tu username aquí
  const password = 'Posada20+'; // Coloca tu password aquí

  // Codificar el username y password en base64 para la autenticación Basic
  const authToken = btoa(`${username}:${password}`);

  try {
    const response = await axios.post(
      'https://api.correoargentino.com.ar/micorreo/v1/token',
      {},
      {
        headers: {
          'Authorization': `Basic ${authToken}`
        }
      }
    );
    
    const { token, expire } = response.data;

    // Guardar el token y la fecha de expiración en localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpire', expire);

    return token;
    
  } catch (error) {
    console.error('Error:', error);
  }
};