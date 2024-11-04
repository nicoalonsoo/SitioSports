import axios from 'axios';

export const handleAuthToken = async () => {
    const username = 'SitioSport'; // Coloca tu username aquí
    const password = 'Posada20+'; // Coloca tu password aquí
  
    // Codificar el username y password en base64 para la autenticación Basic
    const authToken = btoa(`${username}:${password}`);
  
    try {
      const response = await axios.post(
        'https://api.correoargentino.com.ar/micorreo/v1/token',
        {}, // El cuerpo de la petición puede estar vacío si no necesitas enviar datos adicionales
        {
          headers: {
            'Authorization': `Basic ${authToken}`
          }
        }
      );
      
      // Acceder al token desde la respuesta y mostrarlo en consola
      const token = response.data.token;
return token     
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
