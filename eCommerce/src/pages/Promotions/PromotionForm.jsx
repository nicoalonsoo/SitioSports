import React, { useState } from "react";
import axios from "axios";
import { promotionTypes } from "../../constants";
import UploadImage from "../../components/UploadImage/UploadImage";
import thumbnailConvert from "../../utils/convertThumbnail";
import { IoIosArrowDown } from "react-icons/io";
import { allCategories } from "../../constants";

const PromotionForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    img: "",
    type: "",
    categories: [],
    subcategories: [],
    giftCategories: [],
    giftSubcategories: [],
    endDate: "",
  });

  const categoryToSubcategories = {
    Botines: ["Futbol 5", "Futbol 11"],
    Camisetas: ["24/25", "Retro"],
    Accesorios: ["Mochila", "Medias", "Guantes", "Canilleras", "Termo", "Chanclas"],
    Indumentaria: ["Campera", "Buzo", "Chaleco", "Conjunto"],
    Zapatillas: ["Hombre", "Mujer"],
  };

  const [errors, setErrors] = useState({});
  const [uploadImg, setUploadImg] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = form.categories.includes(categoryId)
      ? form.categories.filter((id) => id !== categoryId)
      : [...form.categories, categoryId];

    const validSubcategories = updatedCategories
      .flatMap((category) => categoryToSubcategories[category] || [])
      .filter((subcategory) => form.subcategories.includes(subcategory));

    setForm({
      ...form,
      categories: updatedCategories,
      subcategories: validSubcategories,
    });
  };

  const handleSubcategoryChange = (subcategoryId) => {
    const updatedSubcategories = form.subcategories.includes(subcategoryId)
      ? form.subcategories.filter((id) => id !== subcategoryId)
      : [...form.subcategories, subcategoryId];

    setForm({ ...form, subcategories: updatedSubcategories });
  };

  const handleGiftCategoryChange = (categoryId) => {
    const updatedGiftCategories = form.giftCategories.includes(categoryId)
      ? form.giftCategories.filter((id) => id !== categoryId)
      : [...form.giftCategories, categoryId];

    const validGiftSubcategories = updatedGiftCategories
      .flatMap((category) => categoryToSubcategories[category] || [])
      .filter((subcategory) => form.giftSubcategories.includes(subcategory));

    setForm({
      ...form,
      giftCategories: updatedGiftCategories,
      giftSubcategories: validGiftSubcategories,
    });
  };

  const handleGiftSubcategoryChange = (subcategoryId) => {
    const updatedGiftSubcategories = form.giftSubcategories.includes(
      subcategoryId
    )
      ? form.giftSubcategories.filter((id) => id !== subcategoryId)
      : [...form.giftSubcategories, subcategoryId];

    setForm({ ...form, giftSubcategories: updatedGiftSubcategories });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!form.title) formErrors.title = "El Título es obligatorio";
    if (!form.type) formErrors.type = "El Tipo de promoción es obligatorio";
    if (form.type === "Regalo") {
      if (form.giftCategories.length === 0)
        formErrors.giftCategories =
          "Debe seleccionar al menos una categoría de regalo";
      if (form.giftSubcategories.length === 0)
        formErrors.giftSubcategories =
          "Debe seleccionar al menos una subcategoría de regalo";
    }
    if (!form.endDate)
      formErrors.endDate = "La fecha de caducidad es obligatoria";
    if (form.categories.length === 0)
      formErrors.categories = "Debe seleccionar al menos una categoría";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          "https://sitiosports-production.up.railway.app/promotion",
          form
        );
        if (response.status === 200 || response.status === 201) {
          alert("Promoción agregada exitosamente");
          setForm({
            title: "",
            description: "",
            img: "",
            type: "",
            categories: [],
            subcategories: [],
            giftCategories: [],
            giftSubcategories: [],
            endDate: "",
          });
        } else {
          console.error("Error al agregar la promoción.");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleUploadImage = (value) => {
    setForm({ ...form, img: value });
  };

  const handleCloseUpload = () => {
    setUploadImg(false);
  };
console.log(form);

  return (
    <div className="max-w-lg w-full mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Agregar Promoción</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo Título */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Campo Descripción */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="flex">
          {form.img ? (
            <div className="w-24 relative">
              <img
                className=""
                src={thumbnailConvert(form.img)}
                alt="var-image"
              />
              {/* <div
                    onClick={() => handleDeleteImage(index, vari.id)}
                    className="absolute top-0 right-0 cursor-pointer opacity-70 hover:opacity-100"
                  >
                    X
                  </div> */}
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => setUploadImg(!uploadImg)}
          className="w-1/5 flex items-center justify-center underline cursor-pointer "
        >
          <p className="w-">Cargar imagen</p>
          <IoIosArrowDown
            className={`${uploadImg ? "rotate-180" : ""} duration-300`}
          />
        </div>
        {uploadImg && (
          <UploadImage
            handleUploadImage={handleUploadImage}
            handleCloseUpload={handleCloseUpload}
          />
        )}
        {/* Campo Fecha de Caducidad */}
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Caducidad
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.endDate && (
            <p className="text-red-600 text-sm">{errors.endDate}</p>
          )}
        </div>

        {/* Campo Tipo de Promoción */}
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Promoción
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Seleccione un tipo</option>
            {promotionTypes.map((type) => (
              <option key={type._id} value={type.title}>
                {type.title}
              </option>
            ))}
          </select>
          {errors.type && <p className="text-red-600 text-sm">{errors.type}</p>}
        </div>
        {/* Categorías */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Categorías
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {Object.keys(categoryToSubcategories).map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  value={category}
                  checked={form.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>
          {errors.categories && (
            <p className="text-red-600 text-sm">{errors.categories}</p>
          )}
        </div>

        {/* Subcategorías */}
        {form.categories.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Subcategorías
            </label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {form.categories
                .flatMap((category) => categoryToSubcategories[category])
                .map((subcategory) => (
                  <label key={subcategory} className="flex items-center">
                    <input
                      type="checkbox"
                      value={subcategory}
                      checked={form.subcategories.includes(subcategory)}
                      onChange={() => handleSubcategoryChange(subcategory)}
                      className="mr-2"
                    />
                    {subcategory}
                  </label>
                ))}
            </div>
          </div>
        )}
         {/* Campo Categorías de Regalo */}
         {form.type === "Regalo" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Categorías de Regalo
            </label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {Object.keys(categoryToSubcategories).map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    value={category}
                    checked={form.giftCategories.includes(category)}
                    onChange={() => handleGiftCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
            {errors.giftCategories && <p className="text-red-600 text-sm">{errors.giftCategories}</p>}
          </div>
        )}

        {/* Campo Subcategorías de Regalo */}
        {form.type === "Regalo" && form.giftCategories.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Subcategorías de Regalo
            </label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              {form.giftCategories
                .flatMap((category) => categoryToSubcategories[category])
                .map((subcategory) => (
                  <label key={subcategory} className="flex items-center">
                    <input
                      type="checkbox"
                      value={subcategory}
                      checked={form.giftSubcategories.includes(subcategory)}
                      onChange={() => handleGiftSubcategoryChange(subcategory)}
                      className="mr-2"
                    />
                    {subcategory}
                  </label>
                ))}
            </div>
            {errors.giftSubcategories && <p className="text-red-600 text-sm">{errors.giftSubcategories}</p>}
          </div>
        )}

        {/* Botón de Envío */}
        <div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-800 duration-300"
          >
            Agregar Promoción
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
