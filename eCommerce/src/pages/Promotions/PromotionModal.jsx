import React from "react";
import thumbnailConvert from "../../utils/convertThumbnail";
const PromotionModal = ({closeModal, selectedPromotion}) => {
    const closeModalChild = () => {
        closeModal()
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <button
          onClick={closeModalChild}
          className="text-gray-500 hover:text-gray-700 float-right"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">{selectedPromotion.title}</h2>
        <div className="flex flex-row gap-x-4">
          <div>
            <img
              src={thumbnailConvert(selectedPromotion.img)}
              alt="Promoción"
              className="mb-4 rounded-md w-20"
            />
          </div>
          <div>
            {" "}
            <p>{selectedPromotion.description}</p>
            <p className="mt-2">
              <strong>Tipo:</strong> {selectedPromotion.type}
            </p>
            <p>
              <strong>Fecha de Expiración:</strong>{" "}
              {new Date(selectedPromotion.endDate).toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong>Veces Usado:</strong>{" "}
              {selectedPromotion.usageRecord?.length || 0}
            </p>
            <p>
              <strong>Categorías:</strong>{" "}
              {selectedPromotion.categories.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
