import axios from 'axios';

export const handleAuthToken = async () => {
  try {
    // Realizar la solicitud a la ruta de tu backend que obtiene el token de Correo Argentino
    const response = await axios.get('https://sitiosports-production.up.railway.app/correo-argentino-token');

    const { token, expire } = response.data;

    // Guardar el token y la fecha de expiración en localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpire', expire);

    return token;
    
  } catch (error) {
    console.error('Error al obtener el token desde el backend:', error);
  }
};
