import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadImage from "../../components/UploadImage/UploadImage";
import PostSizeBotines from "../../components/ProductForm/PostSizeBotines";
import PostSizeCamisetas from "../../components/ProductForm/PostSizeCamisetas";
import PostSizeMedias from "../../components/ProductForm/PostSizeMedias";
import Variant from "./Variant";

const ProductCommissionsForm = () => {
  const [variants, setVariants] = useState([
    { variant: "", id: 1, sizes: [], imgUrl: [] },
  ]);
  const [form, setForm] = useState({
    productName: "",
    price: 0,
    compare_price: 0,
    stock: 0,
    brand: "",
    cat: "",
    sizes: [],
    variants: [{ variant: "", id: 1, sizes: [], imgUrl: [] }],
    color: "",
    image: "",
    description: "",
    sub_cat: "",
  });
  const [errors, setErrors] = useState({});

  const camisetasSizes = [
    { size: "S", stock: 0, sold: 0 },
    { size: "M", stock: 0, sold: 0 },
    { size: "L", stock: 0, sold: 0 },
    { size: "XL", stock: 0, sold: 0 },
    { size: "XXL", stock: 0, sold: 0 },
  ];

  const botinesSizes = [
    { size: "39", stock: 0, sold: 0 },
    { size: "40", stock: 0, sold: 0 },
    { size: "41", stock: 0, sold: 0 },
    { size: "42", stock: 0, sold: 0 },
    { size: "43", stock: 0, sold: 0 },
    { size: "44", stock: 0, sold: 0 },
    { size: "45", stock: 0, sold: 0 },
  ];

  const mediasSizes = [
    { size: "39-40", stock: 0, sold: 0 },
    { size: "41-42", stock: 0, sold: 0 },
    { size: "43-44", stock: 0, sold: 0 },
  ];

  const getSizesByCategory = (category) => {
    switch (category) {
      case "Botines":
        return botinesSizes;
      case "Camisetas":
        return camisetasSizes;
      case "Medias":
        return mediasSizes;
      default:
        return [];
    }
  };

  useEffect(() => {
    if (form.cat) {
      const newSizes = getSizesByCategory(form.cat);
      const newVariant = { variant: "", id: 1, sizes: newSizes, imgUrl: [] };
      setForm((prevForm) => ({
        ...prevForm,
        variants: [newVariant],
      }));
    }
  }, [form.cat]);

  const validateField = (name, value) => {
    let error = "";
    if (name === "productName" && !value) error = "El nombre del producto es obligatorio";
    if (name === "price" && (!value || value <= 0)) error = "El precio debe ser mayor que 0";
    if (name === "compare_price" && (!value || value <= 0)) error = "El precio de comparación debe ser mayor que 0";
    if (name === "brand" && !value) error = "La marca es obligatoria";
    if (name === "cat" && !value) error = "La categoría es obligatoria";
    if (name === "sub_cat" && form.cat !== "Medias" && !value) error = "La subcategoría es obligatoria";
    if (name === "description" && !value) error = "La descripción es obligatoria";
    return error;
  };

  const validateVariants = () => {
    let variantsErrors = [];
    form.variants.forEach((variant, index) => {
      let variantErrors = {};
      if (!variant.variant) variantErrors.variant = "El nombre de la variante es obligatorio";
      if (!variant.imgUrl || variant.imgUrl.length === 0) variantErrors.imgUrl = "La imagen es obligatoria";
      if (!variant.sizes || variant.sizes.length === 0) variantErrors.sizes = "El tamaño es obligatorio";
      if (Object.keys(variantErrors).length > 0) {
        variantsErrors[index] = variantErrors;
      }
    });
    return variantsErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSizes = (size, id) => {
    const variantFormIndex = form.variants.findIndex(
      (variant) => variant.id === id
    );
    const variantIndex = variants.findIndex((variant) => variant.id === id);

    if (variantFormIndex !== -1) {
      setForm((prevForm) => {
        const updatedVariants = [...prevForm.variants];
        updatedVariants[variantFormIndex] = {
          ...updatedVariants[variantFormIndex],
          sizes: size,
        };

        return {
          ...prevForm,
          variants: updatedVariants,
        };
      });
    }
  };

  const handleCreateVariant = () => {
    const newId =
      variants.length > 0 ? variants[variants.length - 1].id + 1 : 1;

    const newVariant = { variant: "new", id: newId, sizes: [], imgUrl: [] };

    setVariants((prevVariants) => [...prevVariants, newVariant]);

    setForm((prevForm) => ({
      ...prevForm,
      variants: [...prevForm.variants, newVariant],
    }));
  };

  const handleDeleteVariant = (variantId) => {
    const updatedVariants = variants.filter(
      (variant) => variant.id !== variantId
    );

    setVariants(updatedVariants);

    const updatedFormVariants = form.variants.filter(
      (variant) => variant.id !== variantId
    );

    setForm((prevForm) => ({
      ...prevForm,
      variants: updatedFormVariants,
    }));
  };

  const handleChangeVariantName = (variantId, newValue) => {
    setForm((prevForm) => ({
      ...prevForm,
      variants: prevForm.variants.map((variant) =>
        variant.id === variantId ? { ...variant, variant: newValue } : variant
      ),
    }));

    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId ? { ...variant, variant: newValue } : variant
      )
    );
  };

  const handleChangeVariantImg = (img, variantId) => {
    setForm((prevForm) => ({
      ...prevForm,
      variants: prevForm.variants.map((variant) =>
        variant.id === variantId
          ? { ...variant, imgUrl: [...variant.imgUrl, img] }
          : variant
      ),
    }));

    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId
          ? { ...variant, imgUrl: [...variant.imgUrl, img] }
          : variant
      )
    );
  };

  const handleDeleteImage = (index, variantId) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId
          ? { ...variant, imgUrl: variant.imgUrl.filter((_, i) => i !== index) }
          : variant
      )
    );

    setForm((prevForm) => ({
      ...prevForm,
      variants: prevForm.variants.map((variant) =>
        variant.id === variantId
          ? { ...variant, imgUrl: variant.imgUrl.filter((_, i) => i !== index) }
          : variant
      ),
    }));
  };

  const handleUploadImage = (url) => {
    setForm((prevRegistro) => ({
      ...prevRegistro,
      image: url,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!form.productName) formErrors.productName = "El nombre del producto es obligatorio";
    if (!form.price || form.price <= 0) formErrors.price = "El precio debe ser mayor que 0";
    if (!form.compare_price || form.compare_price <= 0) formErrors.compare_price = "El precio de comparación debe ser mayor que 0";
    if (!form.brand) formErrors.brand = "La marca es obligatoria";
    if (!form.cat) formErrors.cat = "La categoría es obligatoria";
    if (form.cat !== "Medias" && !form.sub_cat) formErrors.sub_cat = "La subcategoría es obligatoria";
    if (!form.description) formErrors.description = "La descripción es obligatoria";

    const variantsErrors = validateVariants();
    if (variantsErrors.length > 0) {
      formErrors.variants = variantsErrors;
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          "https://sitiosports-production.up.railway.app/commissions",
          form
        );

        if (response.status === 200 || response.status === 201) {
          alert("Producto Agregado Exitosamente");
          setForm({
            productName: "",
            price: 0,
            compare_price: 0,
            brand: "",
            cat: "",
            color: "",
            image: "",
            description: "",
          });
          window.location.href = "http://localhost:3000/commissionstable";
        } else {
          console.error("Error al agregar el producto.");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
  };

  return (
    <form class="px-4 md:px-8 max-w-3xl mx-auto py-12" onSubmit={handleSubmit}>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Nuevo Producto Por Encargo
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
                    value={form.productName}
                    autocomplete="productName"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                </div>
                {errors.productName && (
                  <p className="text-red-600 text-sm">{errors.productName}</p>
                )}
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
                    onWheel={handleWheel}
                    autocomplete="price"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Precio"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-600 text-sm">{errors.price}</p>
                )}
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="compare_price"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Precio Comparacion
              </label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="compare_price"
                    id="compare_price"
                    value={form.compare_price}
                    onChange={handleChange}
                    onWheel={handleWheel}
                    autocomplete="compare_price"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Precio Comparacion"
                  />
                </div>
                {errors.compare_price && (
                  <p className="text-red-600 text-sm">{errors.compare_price}</p>
                )}
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
                <select
                  id="brand"
                  name="brand"
                  onChange={handleChange}
                  value={form.brand}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="" disabled selected hidden>
                    Selecciona una opción
                  </option>
                  <option value="Adidas">Adidas</option>
                  <option value="Nike">Nike</option>
                  <option value="Puma">Puma</option>
                </select>
                {errors.brand && (
                  <p className="text-red-600 text-sm">{errors.brand}</p>
                )}
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
                {errors.cat && (
                  <p className="text-red-600 text-sm">{errors.cat}</p>
                )}
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
                    <option value="" disabled selected>
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
                    <option value="" disabled selected>
                      Selecciona una opción
                    </option>
                    <option>24/25</option>
                    <option>Retro</option>
                  </select>
                ) : (
                  ""
                )}
                {errors.sub_cat && (
                  <p className="text-red-600 text-sm">{errors.sub_cat}</p>
                )}
              </div>
            </div>

            <div>
              <div
                className="border-[1px] border-gray-200 bg-gray-100 shadow-md cursor-pointer opacity-60 hover:opacity-100"
                onClick={handleCreateVariant}
              >
                + Agregar Variante
              </div>
            </div>

            <div className="flex flex-wrap gap-4 sm:col-span-6">
              {form.variants?.map((vari, index) => (
                <div key={index}>
                  <Variant
                    handleChangeVariantImg={handleChangeVariantImg}
                    handleDeleteImage={handleDeleteImage}
                    handleChangeVariantName={handleChangeVariantName}
                    handleDeleteVariant={handleDeleteVariant}
                    cat={form.cat}
                    vari={vari}
                    handleSizes={handleSizes}
                    variants={form.variants}
                  />
                  {errors.variants && errors.variants[index] && (
                    <div className="text-red-600 text-sm">
                      {errors.variants[index].variant && <p>{errors.variants[index].variant}</p>}
                      {errors.variants[index].imgUrl && <p>{errors.variants[index].imgUrl}</p>}
                      {errors.variants[index].sizes && <p>{errors.variants[index].sizes}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div class="sm:col-span-6">
              <label
                for="image"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Imagen
              </label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="image"
                    id="image"
                    onChange={handleChange}
                    value={form.image}
                    autocomplete="image"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="URL de la imagen"
                  />
                </div>
                {errors.image && (
                  <p className="text-red-600 text-sm">{errors.image}</p>
                )}
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
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description}</p>
              )}
              <p class="mt-3 text-sm leading-6 text-gray-600">
                Descripción sobre el producto.
              </p>
            </div>

            <UploadImage handleUploadImage={handleUploadImage} />
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <a
          href="/commissionstable"
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancelar
        </a>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ProductCommissionsForm;
