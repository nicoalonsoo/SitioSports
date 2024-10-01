import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoTransparent } from "../../assets/images";
import axios from "axios";
import { botinesSizes, camisetasSizes, mediasSizes } from "../../constants";
import StockBysizes from "../../components/ProductsTable/StockBySizes";
import formatPrice from "../../utils/formatPrice";

const ProductDetailBdd = () => {
  const [isChanging, setIsChanging] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Cambiado a null para evitar falsos positivos
  const [prevProduct, setPrevProduct] = useState(null); // Cambiado a null para evitar falsos positivos
  const products = useSelector((state) => state.orebiReducer.products);

  const tagOptions = ["Hombre", "Mujer", "Deportivo", "Urbano"];

  useEffect(() => {
    if (products && id) {
      const foundProduct = products.find((product) => product.id === id);
      if (foundProduct) {
        // Inicializar tags si no está definido
        if (!foundProduct.tags) {
          foundProduct.tags = [];
        }
        setProduct(foundProduct);
        setPrevProduct(foundProduct);
      }
    }
  }, [products, id]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isChanging) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isChanging]);

  const handleSaveChanges = () => {
    const productChanges = {
      productName: product.productName,
      price: product.price,
      compare_price: product.compare_price,
      stock: product.stock,
      cat: product.cat,
      sub_cat: product.sub_cat,
      sizes: product.sizes,
      brand: product.brand,
      variants: product.variants,
      best_sellers: product.best_sellers,
      new_arrivals: product.new_arrivals,
      special_offers: product.special_offers,
      discount_percentage: product.discount_percentage,
      description: product.description,
      video_youtube: product.video_youtube,
      disabled: product.disabled,
      tags: product.tags
    };

    axios
      .put(`https://sitiosports-production.up.railway.app/products/${product.id}`, productChanges)
      .then((response) => {
        // Maneja la respuesta de la solicitud, por ejemplo, muestra una notificación de éxito
        alert("Cambios guardados con éxito");
        setIsChanging(false);
      })
      .catch((error) => {
        // Maneja errores, muestra una notificación de error, etc.
        console.error("Error al guardar los cambios", error);
        setIsChanging(false);
      });
  };

  const handleChanging = () => {
    console.log("Activating change mode");
    setIsChanging(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setIsChanging(true);
  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: checked,
    }));
    setIsChanging(true);
  };

  const handleSizes = (size) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: size,
    }));
    setIsChanging(true);
  };

  const handleUpdateVariant = (variant) => {
    const index = product.variants.findIndex((v) => v.id === variant.id);
    if (index !== -1) {
      const updatedVariants = [...product.variants];
      updatedVariants[index] = variant;

      setProduct({ ...product, variants: updatedVariants });
      setIsChanging(true);
    } else {
      console.error("No se encontró la variante con el ID proporcionado.");
    }
  };

  const handleCreateVariant = () => {
    const newId =
      product.variants.length > 0
        ? product.variants[product.variants.length - 1].id + 1
        : 1;
    const sizes =
      product.cat === "Botines"
        ? botinesSizes
        : product.cat === "Camisetas"
        ? camisetasSizes
        : mediasSizes;
    const newVariant = { variant: "new", id: newId, sizes: sizes, imgUrl: [] };

    setProduct({ ...product, variants: [...product.variants, newVariant] });
    setIsChanging(true);
  };

  const handleReturn = () => {
    setProduct(prevProduct);
    setIsChanging(false);
  };

  const handleDeleteVariant = (variantId) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: prevProduct.variants.filter(
        (variant) => variant.id !== variantId
      ),
    }));
    setIsChanging(true);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value === "true";
    setProduct((prevProduct) => ({
      ...prevProduct,
      disabled: value,
    }));
    setIsChanging(true);
  };

  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    setProduct((prevProduct) => {
      const updatedTags = checked
        ? [...prevProduct.tags, value]
        : prevProduct.tags.filter((tag) => tag !== value);
      return {
        ...prevProduct,
        tags: updatedTags,
      };
    });
    setIsChanging(true);
  };

  const calculateDiscountedPrice = () => {
    const discountedPrice =
      product.price * (1 - product.discount_percentage / 100);
    return discountedPrice.toFixed(2);
  };

  return (
    <>
      <div className="px-32 py-10">
        <div className="w-full flex justify-between">
          <a href="/producttable">
            <img className="w-20" src={logoTransparent} alt="" />
          </a>
          <div>
            {isChanging ? (
              <button
                className="text-2xl mr-3 bg-blue-500 px-3 py-1 rounded-lg text-gray-200"
                onClick={handleReturn}
              >
                X
              </button>
            ) : (
              ""
            )}
            <button
              onClick={!isChanging ? handleChanging : handleSaveChanges}
              className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
            >
              {!isChanging ? "Realizar Cambios" : "Guardar"}
            </button>
          </div>
        </div>
        {product ? (
          <div className="flex justify-center items-start gap-32 mx-20">
            <div className="flex flex-col gap-2 justify-center ">
              <div className="flex justify-start items-center gap-2 ">
                <h1 className="w-auto font-semibold">Nombre de Producto: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    onChange={handleChange}
                    value={product.productName}
                    autoComplete="productName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                ) : (
                  <p className="text-sm">{product.productName}</p>
                )}
              </div>
              <div className="flex justify-start items-center gap-2">
                <h1 className="w-auto font-bold">Estado: </h1>
                {isChanging ? (
                  <select
                    name="disabled"
                    id="disabled"
                    onChange={handleSelectChange}
                    value={product.disabled}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                  >
                    <option value={false}>Activo</option>
                    <option value={true}>Desactivado</option>
                  </select>
                ) : (
                  <p className="text-sm">
                    {product.disabled === false ? "Activo" : "Desactivado"}
                  </p>
                )}
              </div>
              <div className="flex justify-start items-center gap-2 ">
                <h1 className="w-auto font-semibold">Precio: </h1>
                {isChanging ? (
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                    autoComplete="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                  />
                ) : (
                  <p className="text-sm">${formatPrice(product.price)}</p>
                )}
              </div>
              <div className="flex justify-start items-center gap-2 ">
                <h1 className="w-auto font-semibold">Precio comparación: </h1>
                {isChanging ? (
                  <input
                    type="number"
                    name="compare_price"
                    id="compare_price"
                    value={product.compare_price}
                    onChange={handleChange}
                    autoComplete="compare_price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                  />
                ) : (
                  <p className="text-sm">${formatPrice(product.compare_price)}</p>
                )}
              </div>

              <div className="flex justify-start items-center gap-2 ">
                <h1 className="w-auto font-semibold"> Categoria: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="cat"
                    id="cat"
                    onChange={handleChange}
                    value={product.cat}
                    autoComplete="cat"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                ) : (
                  <p className="text-sm">{product.cat}</p>
                )}
              </div>
              <div className="flex justify-start items-center gap-2 ">
                <h1 className="w-auto font-semibold">Subcategoria: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="sub_cat"
                    id="sub_cat"
                    onChange={handleChange}
                    value={product.sub_cat}
                    autoComplete="sub_cat"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                ) : (
                  <p className="text-sm">{product.sub_cat}</p>
                )}
              </div>

              <div className="flex justify-start items-center gap-2 ">
                <h1 className="w-auto font-semibold">Marca: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    onChange={handleChange}
                    value={product.brand}
                    autoComplete="brand"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                ) : (
                  <p className="text-sm">{product.brand}</p>
                )}
              </div>

              <div className="flex justify-start items-center gap-2 ">
                <h1 className="w-auto font-semibold">Descripcion: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    value={product.description}
                    autoComplete="description"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="description"
                  />
                ) : (
                  <p className="text-sm">{product.description}</p>
                )}
              </div>
              <div className="flex justify-start items-center gap-2 mb-8">
                <h1 className="w-auto font-semibold">Video Youtube: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="video_youtube"
                    id="video_youtube"
                    onChange={handleChange}
                    value={product.video_youtube}
                    autoComplete="video_youtube"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                  />
                ) : (
                  <p className="text-sm">{product.video_youtube}</p>
                )}
              </div>

              <div className="space-y-1">
                <h1 className="font-semibold">Colecciones:</h1>
                <div className="flex items-center justify-start">
                  <input
                    id="best_sellers"
                    type="checkbox"
                    name="best_sellers"
                    checked={product.best_sellers}
                    disabled={!isChanging}
                    onChange={handleChangeCheckbox}
                    className="mr-1"
                  />
                  Best Sellers
                </div>

                <div className="flex items-center justify-start">
                  <input
                    id="new_arrivals"
                    type="checkbox"
                    name="new_arrivals"
                    checked={product.new_arrivals}
                    disabled={!isChanging}
                    onChange={handleChangeCheckbox}
                    className="mr-1"
                  />
                  New Arrivals
                </div>

                <div className="flex items-center justify-start">
                  <input
                    id="special_offers"
                    type="checkbox"
                    name="special_offers"
                    checked={product.special_offers}
                    disabled={!isChanging}
                    onChange={handleChangeCheckbox}
                    className="mr-1"
                  />
                  Special Offers
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Tags:</h1>
                <div className="space-y-2">
                  {tagOptions.map((tag) => (
                    <div key={tag} className="flex items-center">
                      <input
                        id={`tag-${tag}`}
                        name="tags"
                        type="checkbox"
                        value={tag}
                        checked={product.tags.includes(tag)}
                        onChange={handleTagChange}
                        disabled={!isChanging}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`tag-${tag}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-pink-600">
                  {product.total_sales > 0
                    ? `Se vendieron ${product.total_sales} unidades de este producto.`
                    : "Aun no se vendió ninguna unidad."}
                </p>
              </div>
              {/* <div className="flex justify-start items-center gap-2 ">
                <h1 className="w-auto font-semibold">Descuento: </h1>
                {isChanging ? (
                  <input
                    type="number"
                    name="discount_percentage"
                    id="discount_percentage"
                    onChange={handleChange}
                    value={product.discount_percentage}
                    autoComplete="discount_percentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                  />
                ) : (
                  <p className="text-sm">
                    {product.discount_percentage}% de descuento - Precio con
                    descuento:{" "}
                    <span className="font-semibold">
                      ${calculateDiscountedPrice()}
                    </span>
                  </p>
                )}
              </div> */}
            </div>
            <div className="flex flex-wrap gap-8">
              {isChanging ? (
                <div>
                  <div
                    className="border-[1px] border-gray-200 bg-gray-100 shadow-md cursor-pointer opacity-60 hover:opacity-100"
                    onClick={handleCreateVariant}
                  >
                    + Agregar Variante
                  </div>
                </div>
              ) : (
                ""
              )}
              {product.variants?.map((variant) => (
                <StockBysizes
                  key={variant.id}
                  isChanging={isChanging}
                  handleSizes={handleSizes}
                  variant={variant}
                  cat={product.cat}
                  variants={product.variants}
                  handleUpdateVariant={handleUpdateVariant}
                  handleDelete={handleDeleteVariant}
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProductDetailBdd;
