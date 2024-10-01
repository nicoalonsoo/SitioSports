import React, { useState, useEffect } from "react";

const PostAccesorios = ({ id, handleSizes, variants, cat, sub_cat }) => {
  const [sizes, setSizes] = useState([]);

  const mochilaSizes = [{ size: "Mochila", stock: 0, sold: 0 }];

  const guantesSizes = [
    { size: "S", stock: 0, sold: 0 },
    { size: "M", stock: 0, sold: 0 },
    { size: "L", stock: 0, sold: 0 },
  ];

  const canillerasSizes = [
    { size: "S", stock: 0, sold: 0 },
    { size: "M", stock: 0, sold: 0 },
    { size: "L", stock: 0, sold: 0 },
  ];

  const termoSizes = [
    { size: "750ml", stock: 0, sold: 0 },
    { size: "1L", stock: 0, sold: 0 },
  ];

  const mediasSizes = [
    { size: "39-40", stock: 0, sold: 0 },
    { size: "41-42", stock: 0, sold: 0 },
    { size: "43-44", stock: 0, sold: 0 },
  ];

  const getSizesBySubCategory = (sub_cat) => {
    switch (sub_cat) {
      case "Mochila":
        return mochilaSizes;
      case "Termo":
        return termoSizes;
      case "Canilleras":
        return canillerasSizes;
      case "Guantes":
        return guantesSizes;
      case "Medias":
        return mediasSizes;
      default:
        return [];
    }
  };

  useEffect(() => {
    if (cat === "Accesorios") {
      const newSizes = getSizesBySubCategory(sub_cat);
      setSizes(newSizes);
    }
  }, [cat, sub_cat]);

  useEffect(() => {
    // Buscar la variante correspondiente en variants por su id
    const variant = variants.find((variant) => variant.id === id);
    // Si se encuentra la variante, actualizar los tamaños con los tamaños de la variante
    if (variant) {
      if (variant.sizes.length === 0) {
        setSizes(getSizesBySubCategory(sub_cat));
      } else {
        setSizes(variant.sizes);
      }
    }
  }, [id, variants, sub_cat]);

  const handleChange = (event, index) => {
    const { value, name } = event.target;
    // Crear una copia del array sizes
    const updatedSizes = [...sizes];
    // Actualizar el stock del tamaño correspondiente
    if (name === "stock") {
      updatedSizes[index].stock = parseInt(value);
    } else {
      updatedSizes[index].sold = parseInt(value);
    } // Convertir a entero
    // Actualizar el estado
    setSizes(updatedSizes);
    handleSizes(updatedSizes, id); // Asegurarse de pasar el array actualizado
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Talle</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Sold</th>
          </tr>
        </thead>
        <tbody>
          {sizes?.map((size, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{size.size}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="stock"
                  id={`stock-${index}`}
                  value={size.stock}
                  onChange={(event) => handleChange(event, index)}
                  autoComplete="off"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="sold"
                  id={`sold-${index}`}
                  value={size.sold}
                  onChange={(event) => handleChange(event, index)}
                  autoComplete="off"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostAccesorios;
