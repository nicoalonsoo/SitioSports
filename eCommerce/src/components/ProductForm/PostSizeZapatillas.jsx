import React, { useState, useEffect } from "react";

const PostSizeZapatillas = ({ id, handleSizes, variants, cat, sub_cat }) => {
  const botinesSizes = [
    { size: "39", stock: 0, sold: 0 },
    { size: "40", stock: 0, sold: 0 },
    { size: "41", stock: 0, sold: 0 },
    { size: "42", stock: 0, sold: 0 },
    { size: "43", stock: 0, sold: 0 },
    { size: "44", stock: 0, sold: 0 },
    { size: "45", stock: 0, sold: 0 },
  ];

  const zapatillasMujerSizes = [
    { size: "34", stock: 0, sold: 0 },
    { size: "35", stock: 0, sold: 0 },
    { size: "36", stock: 0, sold: 0 },
    { size: "37", stock: 0, sold: 0 },
    { size: "38", stock: 0, sold: 0 },
  ];

  const zapatillasHombreSizes = [
    { size: "39", stock: 0, sold: 0 },
    { size: "40", stock: 0, sold: 0 },
    { size: "41", stock: 0, sold: 0 },
    { size: "42", stock: 0, sold: 0 },
    { size: "43", stock: 0, sold: 0 },
    { size: "44", stock: 0, sold: 0 },
    { size: "45", stock: 0, sold: 0 },
  ];

  const getSizesByCategoryAndSubCategory = (cat, sub_cat) => {
    if (cat === "Botines") {
      return botinesSizes;
    } else if (cat === "Zapatillas") {
      if (sub_cat === "Mujer") {
        return zapatillasMujerSizes;
      } else {
        return zapatillasHombreSizes;
      }
    }
    return [];
  };

  const [sizes, setSizes] = useState(getSizesByCategoryAndSubCategory(cat, sub_cat));

  useEffect(() => {
    if (cat === "Botines" || cat === "Zapatillas") {
      const variant = variants.find((variant) => variant.id === id);
      if (variant) {
        if (variant.sizes.length === 0) {
          setSizes(getSizesByCategoryAndSubCategory(cat, sub_cat));
        } else {
          setSizes(variant.sizes);
        }
      }
    }
  }, [id, variants, cat, sub_cat]);

  const handleChange = (event, index) => {
    const { value, name } = event.target;
    const updatedSizes = [...sizes];
    if (name === "stock") {
      updatedSizes[index].stock = parseInt(value);
    } else {
      updatedSizes[index].sold = parseInt(value);
    }
    setSizes(updatedSizes);
    handleSizes(updatedSizes, id);
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

export default PostSizeZapatillas;
