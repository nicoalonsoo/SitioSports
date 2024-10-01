import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDiscountsFromBackend } from "../../utils/api";
import { setBackendDiscounts } from "../../redux/orebiSlice";
import DiscountsForm from "./DiscountsForm";
import { logoTransparent } from "../../assets/images";
import axios from "axios";

const DiscountsTable = () => {
  const dispatch = useDispatch();

  // Estado para manejar la edición de los cupones
  const [isEditing, setIsEditing] = useState({});
  const [editableData, setEditableData] = useState({});

  // Cargar los descuentos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const discounts = await fetchDiscountsFromBackend();
        dispatch(setBackendDiscounts(discounts)); // Guardar los descuentos en el estado
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Obtener los descuentos del store
  const discounts = useSelector(
    (state) => state.orebiReducer.discounts.discounts
  );

  // Manejar cambios en los inputs de los cupones editables
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [id]: { ...prevData[id], [name]: value },
    }));
  };

  // Activar el modo de edición
  const handleEditClick = (id, code) => {
    setIsEditing((prev) => ({ ...prev, [id]: !prev[id] }));

    if (!isEditing[id]) {
      // Si entramos en modo de edición, guardar los valores actuales
      const discount = discounts.find((discount) => discount.id === id);
      setEditableData((prev) => ({
        ...prev,
        [id]: {
          percentage: discount.percentage,
          description: discount.description,
          remainingUses: discount.remainingUses,
        },
      }));
    } else {
      // Si estamos guardando, mandar el PUT request
      handleSaveChanges(id, code);
    }
  };

  // Enviar PUT request para guardar los cambios
  const handleSaveChanges = async (id, code) => {
    const data = editableData[id];
    try {
      await axios.put(`https://sitiosports-production.up.railway.app/discounts/${code}`, {
        percentage: data.percentage,
        description: data.description,
        remainingUses: data.remainingUses,
      });

      // Volver a cargar los descuentos desde el backend
      const updatedDiscounts = await fetchDiscountsFromBackend();
      dispatch(setBackendDiscounts(updatedDiscounts)); // Actualizar el estado global con los datos nuevos

      alert("Cambios guardados exitosamente");
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };
  return (
    <div className="flex flex-wrap justify-center items-start min-h-screen py-14">
      <div>
        <div className="flex justify-start space-x-6 items-center ">
          <a href="/admin">
            <img className="w-20" src={logoTransparent} alt="" />
          </a>
          <h1 className="text-3xl font-bold text-gray-700">
            Cupones de Descuento
          </h1>
        </div>
      </div>
      <div className="w-full p-4">
        <table className="min-w-full bg-white border border-gray-200 mx-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Código</th>
              <th className="py-2 px-4 border-b text-center">Descripción</th>
              <th className="py-2 px-4 border-b text-center">Porcentaje</th>
              <th className="py-2 px-4 border-b text-center">
                Usos Restantes
              </th>
              <th className="py-2 px-4 border-b text-center">Veces Usado</th>
              <th className="py-2 px-4 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {discounts && discounts.length > 0 ? (
              discounts.map((discount) => (
                <tr key={discount.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {discount.code}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {isEditing[discount.id] ? (
                      <input
                        type="text"
                        name="description"
                        value={editableData[discount.id]?.description || ""}
                        onChange={(e) => handleInputChange(e, discount.id)}
                        className="border p-1"
                      />
                    ) : (
                      discount.description || "Sin descripción"
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {isEditing[discount.id] ? (
                      <input
                        type="number"
                        name="percentage"
                        value={editableData[discount.id]?.percentage || ""}
                        onChange={(e) => handleInputChange(e, discount.id)}
                        className="border p-1 w-16"
                      />
                    ) : (
                      `${discount.percentage}%`
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {isEditing[discount.id] ? (
                      <input
                        type="number"
                        name="remainingUses"
                        value={editableData[discount.id]?.remainingUses || ""}
                        onChange={(e) => handleInputChange(e, discount.id)}
                        className="border p-1 w-16"
                      />
                    ) : (
                      discount.remainingUses
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {discount.usageRecord ? discount.usageRecord.length : 0}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleEditClick(discount.id, discount.code)}
                      className="bg-pink-600 text-white py-1 px-3 rounded-md hover:bg-pink-800"
                    >
                      {isEditing[discount.id] ? "Guardar" : "Modificar"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No se encontraron cupones de descuento.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DiscountsForm />
    </div>
  );
};

export default DiscountsTable;
