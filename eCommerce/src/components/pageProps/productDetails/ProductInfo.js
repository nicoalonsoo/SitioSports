import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import Sizes from "../../Sizes/Sizes";
import PaymentMethods from "./PaymentMethods";
import { FaLock } from "react-icons/fa";
import SizeGuide from "./SizeGuide";
import { motion, AnimatePresence } from "framer-motion";
import formatPrice from "../../../utils/formatPrice";

const ProductInfo = ({
  productInfo,
  handleSelectedImages,
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeMaxQuantity, setSizeMaxQuantity] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({
    variant: "blue",
    id: 2,
    sizes: [
      {
        size: "39",
        stock: 6,
      },
      {
        size: "40",
        stock: 0,
      },
      {
        size: "41",
        stock: 0,
      },
      {
        size: "42",
        stock: 0,
      },
      {
        size: "43",
        stock: 3,
      },
      {
        size: "44",
        stock: 0,
      },
      {
        size: "45",
        stock: 0,
      },
    ],
    imgUrl: [
      "https://res.cloudinary.com/doczyujqf/image/upload/v1715636234/xjh8ueocjorq1puiidvm.jpg",
      "https://res.cloudinary.com/doczyujqf/image/upload/v1715687623/gwriyowwnzne4sriuatf.jpg",
    ],
  });

  const highlightStyle = {
    color: "#d0121a", // Change this to the desired color
    fontWeight: "bold", // Change this to the desired font weight
  };

  useEffect(() => {
    if (
      productInfo &&
      productInfo.variants &&
      productInfo.variants.length > 0
    ) {
      setSelectedVariant(productInfo.variants[0]);
    }
  }, [productInfo]);

  useEffect(() => {
    if (selectedVariant) {
      handleSelectedImages(selectedVariant.imgUrl);
    }
  }, [selectedVariant]);

  const renderDescription = () => {
    if (!productInfo.des) {
      return null; // or handle accordingly if product.des is not defined
    }

    const description = productInfo.des.split(/:(.*?)-/).map((part, index) => {
      return (
        <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
          {part}
        </span>
      );
    });

    return <>{description}</>;
  };

  const dispatch = useDispatch();

  const sizesBotines = [
    {
      _id: 9001,
      title: "39",
    },
    {
      _id: 9003,
      title: "40",
    },
    {
      _id: 9005,
      title: "41",
    },
    {
      _id: 9007,
      title: "42",
    },
    {
      _id: 9009,
      title: "43",
    },
    {
      _id: 9011,
      title: "44",
    },
    {
      _id: 90013,
      title: "45",
    },
  ];

  const sizesCamisetas = [
    {
      _id: 9014,
      title: "S",
    },
    {
      _id: 9015,
      title: "M",
    },
    {
      _id: 9016,
      title: "L",
    },
    {
      _id: 9017,
      title: "XL",
    },
    {
      _id: 9018,
      title: "XXL",
    },
  ];
  const sizesMedias = [
    {
      _id: 9019,
      title: "39-40",
    },
    {
      _id: 9020,
      title: "41-42",
    },
    {
      _id: 9021,
      title: "43-44",
    },
  ];

  const handleSize = (size) => {
    setSelectedSize(size);
    // Buscar el objeto en productInfo.sizes que tiene el tamaño seleccionado
    const selectedSizeObject = selectedVariant.sizes.find(
      (item) => item.size === size
    );

    if (selectedSizeObject) {
      // Si se encontró el objeto, actualizar el estado sizeMaxQuantity con el stock correspondiente
      setSizeMaxQuantity(selectedSizeObject.stock);
    } else {
      // Manejar el caso donde el tamaño seleccionado no se encuentra en productInfo.sizes
      console.log("El tamaño seleccionado no se encontró en el producto");
      // Podrías establecer sizeMaxQuantity en 0 u otro valor predeterminado si lo deseas
      setSizeMaxQuantity(0);
    }
  };

  const availableSizes = selectedVariant.sizes
    ?.map((size) => {
      if (size.stock > 0) {
        return size.size;
      }
    })
    .filter((size) => size !== undefined && size !== null);

  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    dispatch(
      addToCart({
        id: productInfo.id,
        name: productInfo.productName,
        quantity: 1,
        maxQuantity: sizeMaxQuantity,
        size: selectedSize,
        image: selectedVariant.imgUrl[0],
        badge: productInfo.badge,
        price: productInfo.price,
        color: productInfo.color,
        variant: selectedVariant,
      })
    );
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "AddToCart", 
      eventCategory: "AddToCart", 
      content_ids: [productInfo.id],  
      content_name: productInfo.productName,  
      content_type: "product", 
      value: productInfo.price,  
      currency: "ARS",  
    })
  };

  const handleVariantChange = (variant) => {
    setSelectedSize(null);
    setSelectedVariant(variant);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4 lg:w-[40%]">
        <div>
          <span className="text-[#fc148c] font-semibold">Fútbol</span>
          <h1 className="text-3xl font-normal">{productInfo.productName}</h1>
          {productInfo.compare_price && parseFloat(productInfo.compare_price) > 0 ? (
            <div className="flex items-center space-x-4">
              <p className="text-3xl font-extrabold text-gray-700">
                ${formatPrice(productInfo.price)}
              </p>
              <h6 className="text-xl line-through font-normal text-gray-700">
                ${formatPrice(productInfo.compare_price)}
              </h6>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <p className="text-3xl font-extrabold text-gray-700">
                ${formatPrice(productInfo.price)}
              </p>
            </div>
          )}
        </div>
        <p className="text-gray-700">
          {productInfo.description ? productInfo.description : ""}
        </p>
        <PaymentMethods />
        {productInfo.variants ? (
          <div className="flex py-4">
            {productInfo.variants?.map((variant) => (
              <div
                key={variant.id}
                className={`cursor-pointer border-gray-300 border-[1px] ${
                  variant.id !== selectedVariant.id
                    ? ""
                    : "border-b-2 border-gray-700"
                }`}
                onClick={() => handleVariantChange(variant)}
              >
                <img className="w-20" src={variant.imgUrl[0]} />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <Sizes
          selectedSize={selectedSize}
          handleSize={handleSize}
          productSizes={availableSizes}
          sizes={
            productInfo.cat === "Botines"
              ? sizesBotines 
             : productInfo.cat === "Zapatillas"
              ? sizesBotines
              : productInfo.cat === "Camisetas"
              ? sizesCamisetas
              : productInfo.cat === "Indumentaria"
              ? sizesCamisetas
              : sizesMedias
          } 
        />
        <SizeGuide cat={productInfo.cat} brand={productInfo.brand} />

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleAddToCart}
            className={`bg-[#fc148c] flex justify-start text-white font-semibold py-3 px-4 lg:px-16 rounded-sm w-auto h-auto lg:h-full text-xl 
        `}
            // disabled={!selectedSize}
          >
            Agregar al Carrito
          </button>
          <AnimatePresence>
            {showAlert && (
              <motion.div
                className="alert border flex justify-start text'left bg-[#fc148c] text-white p-2 text-sm lg:text-lg rounded-sm mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Por favor, selecciona un talle.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-start gap-4">
          <FaLock className="text-2xl" />
          <div className="flex flex-col">
            <p className="font-semibold">Compra Protegida</p>
            <p className="text-sm">
              Tus datos cuidados durante toda la compra.
            </p>
          </div>
        </div>
        <p className="text-sm">
          EN SITIO SPORTS, VENDEMOS PRODUCTOS CON ENTREGA INMEDIATA Y PRODUCTOS
          POR ENCARGO. LOS PRODUCTOS CON ENTREGA INMEDIATA DEMORAN DE 2 A 6 DÍAS
          HÁBILES EN LLEGAR A TU PUERTA Y LOS PRODUCTOS POR ENCARGO DEMORAN DE
          30 A 35 DÍAS HÁBILES. PARA VER EL CATALOGO POR ENCARGO{" "}
          <a className="underline" href="/encargo">
            HAZ CLICK AQUI
          </a>
        </p>
      </div>
    </>
  );
};

export default ProductInfo;
