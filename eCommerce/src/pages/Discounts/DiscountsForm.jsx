import React, { useState } from 'react';
import axios from 'axios';

const DiscountsForm = () => {
  const [form, setForm] = useState({
    code: '',
    description: '',
    percentage: 0,
    remainingUses: 1,  // Añadido el campo de 'remainingUses'
  });

  const [errors, setErrors] = useState({});

  // Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Validar formulario
  const validateForm = () => {
    let formErrors = {};
    if (!form.code) {
      formErrors.code = 'El código es obligatorio';
    }
    if (form.percentage <= 0) {
      formErrors.percentage = 'El porcentaje debe ser mayor que 0';
    }
    if (form.remainingUses < 1) {
      formErrors.remainingUses = 'El número de usos debe ser al menos 1';
    }
    return formErrors;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('https://sitiosports-production.up.railway.app/discounts', form);
        if (response.status === 200 || response.status === 201) {
          alert('Descuento agregado exitosamente');
          setForm({
            code: '',
            description: '',
            percentage: 0,
            remainingUses: 1,
          });
        } else {
          console.error('Error al agregar el descuento.');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Agregar Descuento</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código</label>
          <input
            type="text"
            id="code"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.code && <p className="text-red-600 text-sm">{errors.code}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">Porcentaje</label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            value={form.percentage}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            min="0"
          />
          {errors.percentage && <p className="text-red-600 text-sm">{errors.percentage}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="remainingUses" className="block text-sm font-medium text-gray-700">Usos Restantes</label>
          <input
            type="number"
            id="remainingUses"
            name="remainingUses"
            value={form.remainingUses}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            min="1"
          />
          {errors.remainingUses && <p className="text-red-600 text-sm">{errors.remainingUses}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-800 duration-300"
          >
            Agregar Descuento
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiscountsForm;
