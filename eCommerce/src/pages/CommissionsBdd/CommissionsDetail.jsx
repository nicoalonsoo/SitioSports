import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoTransparent } from "../../assets/images";
import axios from "axios";
import { botinesSizes, camisetasSizes } from "../../constants";
import StockBysizes from "../../components/ProductsTable/StockBySizes";
const CommissionsDetailBdd = () => {
  const [isChanging, setIsChanging] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [prevProduct, setPrevProduct] = useState("");
  const products = useSelector((state) => state.orebiReducer.commissions);

  useEffect(() => {
    if (products) {
      const foundProduct = products.find((product) => product.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setPrevProduct(foundProduct);
      }
    }
  }, [products]);

  const handleSaveChanges = () => {
    const productChanges = {
      productName: product.productName,
      price: product.price,
      stock: product.stock,
      cat: product.cat,
      sub_cat: product.sub_cat,
      sizes: product.sizes,
      brand: product.brand,
      variants: product.variants,
    };
    axios
      .put(`https://sitiosports-production.up.railway.app/commissions/${product.id}`, productChanges)
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
    setIsChanging(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevRegistro) => ({
      ...prevRegistro,
      [name]: value,
    }));
    // validate({ ...registro, [name]: value });
  };

  const handleSizes = (size) => {
    setProduct((prevForm) => ({
      ...prevForm,
      sizes: size,
    }));
  };

  const handleUpdateVariant = (variant) => {
    const index = product.variants.findIndex((v) => v.id === variant.id);
    console.log("entro a la funcion");
    console.log(variant);
    if (index !== -1) {
      const updatedVariants = [...product.variants];
      updatedVariants[index] = variant;

      setProduct({ ...product, variants: updatedVariants });
    } else {
      console.error("No se encontró la variante con el ID proporcionado.");
    }
  };

  
  const handleCreateVariant = () => {
    const newId =
      product.variants.length > 0 ? product.variants[product.variants.length - 1].id + 1 : 1;
      const sizes = product.cat === "Botines" ? botinesSizes : camisetasSizes;
    const newVariant = { variant: "new", id: newId, sizes: sizes, imgUrl: [] };

    setProduct({...product, variants: [...product.variants, newVariant]});
  };

  const handleReturn = () => {
    setProduct(prevProduct);
    setIsChanging(!isChanging);
  };


  const handleDeleteVariant = (variantId) => {
    setProduct((prevForm) => ({
      ...prevForm,
      variants: prevForm.variants.filter((variant) => variant.id !== variantId)
    }));
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
            <div className="flex flex-col gap-4 justify-center ">
              <div className="flex justify-start gap-2 text-xl">
                <h1 className="font-bold">Nombre de Producto: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    onChange={handleChange}
                    value={product.productName}
                    autocomplete="productName"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                ) : (
                  <p>{product.productName}</p>
                )}
              </div>
              <div className="flex justify-start gap-2 text-xl">
                <h1 className="font-bold">Precio: </h1>
                {isChanging ? (
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                    autocomplete="price"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="janesmith"
                  />
                ) : (
                  <p>{product.price}</p>
                )}
              </div>

              <div className="flex justify-start gap-2 text-xl">
                <h1 className="font-bold"> Categoria: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="cat"
                    id="cat"
                    onChange={handleChange}
                    value={product.cat}
                    autocomplete="cat"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                ) : (
                  <p>{product.cat}</p>
                )}
              </div>
              <div className="flex justify-start gap-2 text-xl">
                <h1 className="font-bold">Subcategoria: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="sub_cat"
                    id="sub_cat"
                    onChange={handleChange}
                    value={product.sub_cat}
                    autocomplete="sub_cat"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                ) : (
                  <p>{product.sub_cat}</p>
                )}
              </div>
              {/* {isChanging ? (
              <div>
                {product.cat === "Botines" ? (
                  <SizesForm
                    handleSizes={isChanging ? handleSizes : ""}
                    selectedSizes={product.sizes}
                  />
                ) : (
                  ""
                )}
                {product.cat === "Camisetas" ? (
                  <SizesFormCamisetas
                    handleSizes={isChanging ? handleSizes : ""}
                    selectedSizes={product.sizes}
                  />
                ) : (
                  ""
                )}
                {product.cat === "Medias" ? (
                  <SizesFormMedias
                    handleSizes={isChanging ? handleSizes : ""}
                    selectedSizes={product.sizes}
                  />
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )} */}

              <div className="flex justify-start gap-2 text-xl">
                <h1 className="font-bold">Marca: </h1>
                {isChanging ? (
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    onChange={handleChange}
                    value={product.brand}
                    autocomplete="brand"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-6"
                    placeholder="Nike Ultimate"
                  />
                ) : (
                  <p text-lg>{product.brand}</p>
                )}
              </div>
              {/* <div className="flex justify-center w-[270px]">
                <img src={product.image} alt="" />
              </div> */}
            </div>
            <div className="flex flex-wrap gap-8">
{ isChanging ?              <div>
                <div
                  className="border-[1px] border-gray-200 bg-gray-100 shadow-md cursor-pointer opacity-60 hover:opacity-100"
                  onClick={handleCreateVariant}
                >
                  + Agregar Variante
                </div>
              </div> : ""}
              {product.variants?.map((variant) => (
                <StockBysizes
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

export default CommissionsDetailBdd;
