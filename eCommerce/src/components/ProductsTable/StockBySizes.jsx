import React, { useState, useEffect } from "react";
import Variant from "../../pages/ProductForm/Variant";
const StockBysizes = ({
  sizes,
  isChanging,
  handleSizes,
  variant,
  cat,
  variants,
  handleUpdateVariant,
  handleDelete,
}) => {
  // Estado local para manejar los tamaños
  const [localSizes, setLocalSizes] = useState([]);
  const [localVariant, setLocalVariant] = useState("");
  // Efecto para inicializar el estado local con los tamaños iniciales
  useEffect(() => {
    setLocalVariant(variant);
    setLocalSizes(variant.sizes);
  }, [sizes]);

  useEffect(() => {
    handleUpdateVariant(localVariant);
  }, [localVariant]);

  const handleChange = (event, index) => {
    const { value } = event.target;
    // Crear una copia del array sizes
    const updatedSizes = [...localSizes];
    // Actualizar el stock del tamaño correspondiente
    updatedSizes[index].stock = parseInt(value); // Convertir a entero
    // Actualizar el estado
    setLocalSizes(updatedSizes);
    handleSizes(localSizes);
  };

  const handleChangeVariantImg = (img) => {
    setLocalVariant((prevForm) => ({
      ...prevForm,
      imgUrl: [...prevForm.imgUrl, img],
    }));
    handleUpdateVariant(localVariant);
  };

  const handleDeleteImage = (index) => {
    // Actualizar el estado con las imágenes actualizadas
    setLocalVariant((prevVariant) => {
      // Usamos spread para crear una nueva copia del objeto prevVariant
      const newVariant = { ...prevVariant };
      // Filtramos las imágenes para eliminar la que coincide con el índice dado
      newVariant.imgUrl = newVariant.imgUrl.filter((_, i) => i !== index);
      return newVariant;
    });
  };

  const handleChangeVariantName = (id, newValue) => {
    setLocalVariant((prevForm) => ({
      ...prevForm,
      variant: newValue,
    }));
  };

  const handleDeleteVariant = (variantId) => {
    handleDelete(variantId);
  };

  const handleSizesVariants = (size, id) => {};

  return (
    <div>
      {isChanging === false ? (
        <div
        // className="overflow-x-auto"
        >
          <p>{variant.variant}</p>
          <div className="flex py-4 gap-2">
            {variant.imgUrl?.map((img) => (
              <img className="w-20" src={img} alt="" />
            ))}
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Talle</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">sold</th>
              </tr>
            </thead>
            <tbody>
              {localSizes?.map((size, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{size.size}</td>
                  <td className="border px-4 py-2 ">
                    {isChanging ? (
                      <input
                        type="number"
                        name="stock"
                        id={`stock-${index}`}
                        value={size.stock}
                        onChange={(event) => handleChange(event, index)}
                        autoComplete="off"
                        classname="border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 "
                      />
                    ) : (
                      <p>{size.stock}</p>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {size.sold ? size.sold : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Variant
          handleChangeVariantImg={handleChangeVariantImg}
          handleDeleteImage={handleDeleteImage}
          handleChangeVariantName={handleChangeVariantName}
          handleDeleteVariant={handleDeleteVariant}
          cat={cat}
          vari={variant}
          handleSizes={handleSizesVariants}
          variants={variants}
        />
      )}
    </div>
  );
};

export default StockBysizes;
