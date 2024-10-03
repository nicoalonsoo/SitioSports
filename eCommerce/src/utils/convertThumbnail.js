const thumbnailConvert = (url) => {
    const transformation = "/c_thumb,w_200,g_face"; // Transformación a aplicar

    // Buscamos "/upload/" en la URL para insertar la transformación después de él
    const uploadIndex = url.indexOf("/upload/");
    
    if (uploadIndex === -1) {
      // Si la URL no tiene "/upload/", devolvemos la original sin modificar
      return url;
    }

    // Separamos la URL en dos partes y agregamos la transformación después de "/upload/"
    const part1 = url.slice(0, uploadIndex + 7); // Parte hasta "/upload/"
    const part2 = url.slice(uploadIndex + 7);    // Parte después de "/upload/"

    // Combinamos las partes y añadimos la transformación
    return `${part1}${transformation}/${part2}`;
  };

  export default thumbnailConvert;