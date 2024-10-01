import React, { useState } from 'react';
import axios from 'axios';

const ExcelDownloadButton = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await axios.get('/exportToExcel', {
        responseType: 'blob', // Indicar que esperamos una respuesta binaria (blob)
      });

      // Crear un objeto URL para el blob de datos y crear un enlace para descargar
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'base de datos.xlsx'); // Nombre del archivo a descargar
      document.body.appendChild(link);
      link.click();
      setDownloading(false);
    } catch (error) {
      console.error('Error al descargar el archivo', error);
      setDownloading(false);
    }
  };

  return (
    <div className='px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none'>
      <button onClick={handleDownload} disabled={downloading}>
        Descargar Excel
      </button>
      {downloading && <p>Descargando...</p>}
    </div>
  );
};

export default ExcelDownloadButton;