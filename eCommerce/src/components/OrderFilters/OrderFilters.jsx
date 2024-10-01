import React, { useState } from 'react';

const OrderFilter = ({ filters, handleOrderFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleOrderFilter(name, checked);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-[10000]">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={toggleDropdown}
      >
        Filtrar por Estado
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <label className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                name="Aprobado"
                checked={filters.Aprobado}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Aprobado
            </label>

            <label className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                name="Enviado"
                checked={filters.Enviado}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Enviado
            </label>
            <label className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                name="Entregado"
                checked={filters.Entregado}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Entregado
            </label>
            
            <label className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                name="Pago Pendiente"
                checked={filters["Pago Pendiente"]}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Pago Pendiente
            </label>
            <label className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                name="Cancelado"
                checked={filters.Cancelado}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Cancelado
            </label>
            <label className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                name="rejected"
                checked={filters.rejected}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Tarjeta Rechazada
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilter;
