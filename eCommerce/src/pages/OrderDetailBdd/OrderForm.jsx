import React, { useState } from "react";
import axios from "axios";
const OrderForm = () => {
  // const [selectedSizes, setSelectedSizes] = useState([]);
  const [form, setForm] = useState({
    items: [],
    name: "",
    email: "",
    phone: "",
    shipment: {},
    order_type: "",
    status: "",
    status_detail: "",
    payment_method: "",
    shipping_amount: "",
    transaction_amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cat") {
      // Limpiar el estado de sizes si cambia la categoría
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
        sizes: [], // Limpiar a un array vacío
        sub_cat: "" ,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://sitiosports-production.up.railway.app/order", form);

      // Verifica si la solicitud fue exitosa
      if (response.status === 200 || response.status === 201) {
        alert("Producto Agregado Exitosamente");
        setForm({
          items: [],
          name: "",
          email: "",
          phone: "",
          shipment: {},
          order_type: "",
          status: "",
          status_detail: "",
          payment_method: "",
          shipping_amount: "",
          transaction_amount: "",
        });
        window.location.href = "http://localhost:3000/producttable";
      } else {
        console.error("Error al agregar el producto.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <form class="px-4 md:px-8 max-w-3xl mx-auto py-12" onSubmit={handleSubmit}>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Nuevo Producto
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Esta información va a ser publica, porfavor revisar bien las
            casillas antes de publicar.
          </p>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label
                for="productName"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Titulo del producto
              </label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    onChange={handleChange}
                    value={form.items}
                    autocomplete="productName"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="price"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Precio
              </label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={form.price}
                    onChange={handleChange}
                    autocomplete="price"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="brand"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Marca
              </label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  {/* <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    onChange={handleChange}
                    value={form.brand}
                    autocomplete="brand"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="cat"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Categoría
              </label>
              <div class="mt-2">
                <select
                  id="cat"
                  name="cat"
                  autocomplete="categoria"
                  onChange={handleChange}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="" disabled selected hidden>
                    Selecciona una opción
                  </option>
                  <option>Camisetas</option>
                  <option>Botines</option>
                  <option>Medias</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="sub_cat"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Subcategoria
              </label>
              <div className="mt-2">
                {form.cat === "Botines" ? (
                  <select
                    id="sub_cat"
                    name="sub_cat"
                    value={form.sub_cat}
                    autoComplete="categoria"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled selected >
                      Selecciona una opción
                    </option>
                    <option>Futbol 5</option>
                    <option>Futbol 11</option>
                  </select>
                ) : form.cat === "Camisetas" ? (
                  <select
                    id="sub_cat"
                    name="sub_cat"
                    value={form.sub_cat}
                    autoComplete="categoria"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled selected >
                      Selecciona una opción
                    </option>
                    <option>24/25</option>
                    <option>Retro</option>
                  </select>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div classname="sm:col-span-4">
              <label
                for="color"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Color
              </label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  {/* <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                  <input
                    type="text"
                    name="color"
                    id="color"
                    onChange={handleChange}
                    value={form.color}
                    autocomplete="color"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="image"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                image
              </label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  {/* <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                  <input
                    type="text"
                    name="image"
                    id="image"
                    onChange={handleChange}
                    value={form.image}
                    autocomplete="image"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="description"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Descripción
              </label>
              <div class="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                Descripción sobre el producto.
              </p>
            </div>
           
        
          </div>
        </div>
        
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <a
          href="/producttable"
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </a>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
