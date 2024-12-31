import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPromotionsFromBackend } from "../../utils/api";
import { setBackendPromotions } from "../../redux/orebiSlice";
import PromotionForm from "./PromotionForm";
import { logoTransparent } from "../../assets/images";
import axios from "axios";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import PromotionModal from "./PromotionModal";

const PromotionsTable = () => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState({});
  const [editableData, setEditableData] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promotions = await fetchPromotionsFromBackend();
        dispatch(setBackendPromotions(promotions));
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const discounts = useSelector(
    (state) => state.orebiReducer.promotions.promotion
  );

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [id]: { ...prevData[id], [name]: value },
    }));
  };

  const handleEditClick = (id, code) => {
    setIsEditing((prev) => ({ ...prev, [id]: !prev[id] }));

    if (!isEditing[id]) {
      const discount = discounts.find((discount) => discount.id === id);
      setEditableData((prev) => ({
        ...prev,
        [id]: {
          title: discount.title,
          percentage: discount.percentage,
          type: discount.type,
          endDate: discount.endDate,
          description: discount.description,
          remainingUses: discount.remainingUses,
        },
      }));
    } else {
      handleSaveChanges(id, code);
    }
  };

  const handleSaveChanges = async (id, code) => {
    const data = editableData[id];
    try {
      await axios.put(
        `https://sitiosports-production.up.railway.app/promotion/${id}`,
        {
          title: data.title,
          description: data.description,
          endDate: data.endDate,
        }
      );

      const updatedPromotions = await fetchPromotionsFromBackend();
      dispatch(setBackendPromotions(updatedPromotions));
      alert("Cambios guardados exitosamente");
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const handleInfoClick = (promotion) => {
    setSelectedPromotion(promotion);
    setShowInfo(true);
  };

  const closeModal = () => {
    setShowInfo(false);
    setSelectedPromotion(null);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta promoción?")) {
      try {
        await axios.delete(
          `https://sitiosports-production.up.railway.app/promotion/${id}`
        );

        const updatedPromotions = await fetchPromotionsFromBackend();
        dispatch(setBackendPromotions(updatedPromotions));

        alert("Promoción eliminada exitosamente.");
      } catch (error) {
        console.error("Error al eliminar la promoción:", error);
        alert("Hubo un error al intentar eliminar la promoción.");
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-start min-h-screen py-14">
      <div>
        <div className="flex justify-start space-x-6 items-center">
          <a href="/admin">
            <img className="w-20" src={logoTransparent} alt="" />
          </a>
          <h1 className="text-3xl font-bold text-gray-700">Promociones</h1>
        </div>
      </div>
      <div className="w-full p-4">
        <table className="min-w-full bg-white border border-gray-200 mx-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Titulo</th>
              <th className="py-2 px-4 border-b text-center">Descripción</th>
              <th className="py-2 px-4 border-b text-center">Tipo</th>
              <th className="py-2 px-4 border-b text-center">
                Fecha de Expiración
              </th>
              <th className="py-2 px-4 border-b text-center">Status</th>
              <th className="py-2 px-4 border-b text-center">Veces Usado</th>
              <th className="py-2 px-4 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {discounts && discounts.length > 0 ? (
              discounts.map((discount) => (
                <tr key={discount.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {isEditing[discount.id] ? (
                      <input
                        type="text"
                        name="title"
                        value={editableData[discount.id]?.title || ""}
                        onChange={(e) => handleInputChange(e, discount.id)}
                        className="border p-1"
                      />
                    ) : (
                      discount.title
                    )}
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
                    {discount.type}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {isEditing[discount.id] ? (
                      <input
                        type="date"
                        name="endDate"
                        value={editableData[discount.id]?.endDate || ""}
                        onChange={(e) => handleInputChange(e, discount.id)}
                        className="border p-1 w-16"
                      />
                    ) : (
                      new Date(discount.endDate).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(discount.endDate) >= new Date()
                      ? "Activo"
                      : "No Activo"}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {discount.usageRecord ? discount.usageRecord.length : 0}
                  </td>
                  <td className="py-2 px-4 border-b text-center flex space-x-2 justify-center">
                    <button
                      onClick={() =>
                        handleEditClick(discount.id, discount.code)
                      }
                      className="bg-pink-600 text-white p-2 rounded-md hover:bg-pink-800"
                    >
                      {isEditing[discount.id] ? "Guardar" : <FaEdit />}
                    </button>
                    {!isEditing[discount.id] && (
                      <>
                        <button
                          onClick={() => handleInfoClick(discount)}
                          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800"
                        >
                          <FaInfoCircle />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(discount.id)}
                          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-800"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No se encontraron Promociones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showInfo && selectedPromotion && (
        <PromotionModal
          closeModal={closeModal}
          selectedPromotion={selectedPromotion}
        />
      )}

      <PromotionForm />
    </div>
  );
};

export default PromotionsTable;
