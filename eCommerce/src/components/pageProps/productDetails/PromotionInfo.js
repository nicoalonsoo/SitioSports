import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import thumbnailConvert from "../../../utils/convertThumbnail";
import Sizes from "../../Sizes/Sizes";
import { addToCart } from "../../../redux/orebiSlice";
import formatPrice from "../../../utils/formatPrice";
import PaymentMethods from "./PaymentMethods";
import { FaLock } from "react-icons/fa";
const sizesBotines = [
  { _id: 9001, title: "39" },
  { _id: 9003, title: "40" },
  { _id: 9005, title: "41" },
  { _id: 9007, title: "42" },
  { _id: 9009, title: "43" },
  { _id: 9011, title: "44" },
  { _id: 90013, title: "45" },
];

const sizesCamisetas = [
  { _id: 9014, title: "S" },
  { _id: 9015, title: "M" },
  { _id: 9016, title: "L" },
  { _id: 9017, title: "XL" },
  { _id: 9018, title: "XXL" },
];

const sizesMedias = [
  { _id: 9019, title: "39-40" },
  { _id: 9020, title: "41-42" },
  { _id: 9021, title: "43-44" },
];

const chanclasSizes = [
  {
    _id: 9022,
    title: "34/35",
  },
  {
    _id: 9023,
    title: "36/37",
  },
  {
    _id: 9024,
    title: "38/39",
  },
  {
    _id: 9025,
    title: "40/41",
  },
  {
    _id: 9026,
    title: "42/43",
  },
  {
    _id: 9027,
    title: "44/45",
  },
];

const PromotionInfo = ({ productInfo }) => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [giftSearchQuery, setGiftSearchQuery] = useState("");
  const [promoProducts, setPromoProducts] = useState([]);
  const [giftPromoProducts, setGiftPromoProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredGiftProducts, setFilteredGiftProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showGiftSearchBar, setShowGiftSearchBar] = useState(false);
  const [giftProduct, setGiftProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      productInfo?.categories?.length > 0 ||
      productInfo?.subcategories?.length > 0
    ) {
      const filtered = products.filter((product) => {
        const matchesCategory = productInfo.categories.includes(product.cat);
        const matchesSubCategory = productInfo.subcategories.some((subCat) =>
          product.sub_cat?.includes(subCat)
        );

        return matchesCategory && matchesSubCategory;
      });

      setPromoProducts(filtered);
    }
  }, [productInfo, products]);

  useEffect(() => {
    if (productInfo.type === "Regalo") {
      const giftFiltered = products.filter((product) => {
        const matchesGiftCategory = productInfo.giftCategories.includes(
          product.cat
        );
        const matchesGiftSubCategory = productInfo.giftSubcategories.some(
          (giftSubCat) => product.sub_cat?.includes(giftSubCat)
        );

        return matchesGiftCategory && matchesGiftSubCategory;
      });

      setGiftPromoProducts(giftFiltered);
    }
  }, [productInfo, products]);

  // Filter promo products by search
  useEffect(() => {
    const filtered = promoProducts.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, promoProducts]);

  // Filter gift products by search
  useEffect(() => {
    const filtered = giftPromoProducts.filter((item) =>
      item.productName.toLowerCase().includes(giftSearchQuery.toLowerCase())
    );
    setFilteredGiftProducts(filtered);
  }, [giftSearchQuery, giftPromoProducts]);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleGiftSearch = (e) => setGiftSearchQuery(e.target.value);

  const handleOpenSearchBar = () => {
    setFilteredProducts(promoProducts);
    setShowSearchBar(true);
    setShowGiftSearchBar(false);
    setGiftSearchQuery("");
  };
  const handleCloseSearchBar = () => {
    setSearchQuery("");
    setShowSearchBar(false);
  };
  const handleOpenGiftSearchBar = () => {
    setFilteredGiftProducts(giftPromoProducts);
    setShowGiftSearchBar(true);
    setShowSearchBar(false);
    setSearchQuery("");
  };
  const handleCloseGiftSearchBar = () => {
    setGiftSearchQuery("");
    setShowGiftSearchBar(false);
  };

  const handleSelectGiftProduct = (product) => {
    // Verifica si ya existe un producto de regalo en selectedProducts
    const hasGiftProduct = selectedProducts.some((item) => item.isGift);

    if (hasGiftProduct) {
      alert("Solo puedes agregar un producto de regalo.");
      return;
    }

    // Marca el producto como regalo y lo envía a handleAddProductToPromotion
    const giftProduct = { ...product, isGift: true };
    handleAddProductToPromotion(giftProduct);
  };

  const handleAddProductToPromotion = (product) => {
    const maxProducts =
      productInfo.type === "2x1"
        ? 2
        : productInfo.type === "3x2"
        ? 3
        : productInfo.type === "Regalo"
        ? 2
        : Infinity;

    // Si el tipo es "Regalo", verificamos si ya se agregaron productos normales y de regalo
    if (productInfo.type === "Regalo") {
      const hasNormalProduct = selectedProducts.some((item) => !item.isGift);
      const hasGiftProduct = selectedProducts.some((item) => item.isGift);

      if (hasNormalProduct && hasGiftProduct) {
        alert(
          "Para esta promoción, solo puedes agregar un producto normal y un producto de regalo."
        );
        return;
      }

      // Validación específica según la propiedad isGift
      if (product.isGift && hasGiftProduct) {
        alert("Ya has seleccionado un producto de regalo.");
        return;
      }

      if (!product.isGift && hasNormalProduct) {
        alert("Ya has seleccionado un producto normal.");
        return;
      }
    }

    // Lógica estándar para cualquier tipo de promoción
    if (selectedProducts.length >= maxProducts) {
      alert(
        `Solo puedes agregar un máximo de ${maxProducts} productos para esta promoción.`
      );
      return;
    }

    // Selecciona la primera variante como `selectedVariant` si no está ya definida
    const firstVariant =
      product.variants && product.variants.length > 0
        ? product.variants[0]
        : null;

    const productToAdd = {
      ...product,
      selectedVariant: firstVariant, // Asigna la primera variante
      selectedSize: "", // Inicializa el tamaño como vacío
    };

    setShowSearchBar(false);
    setSearchQuery("");
    setShowGiftSearchBar(false);
    setGiftSearchQuery("");

    // Agrega el producto al estado
    setSelectedProducts((prev) => [...prev, productToAdd]);
  };

  const handleVariantChange = (index, variant) => {
    setSelectedProducts((prev) =>
      prev.map((product, i) =>
        i === index
          ? { ...product, selectedVariant: variant, selectedSize: "" }
          : product
      )
    );
  };

  const handleRemoveProductFromPromotion = (index) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSize = (size, index) => {
    setSelectedProducts((prev) =>
      prev.map((product, i) =>
        i === index ? { ...product, selectedSize: size } : product
      )
    );

    const selectedSizeObject = selectedProducts[
      index
    ].selectedVariant.sizes.find((item) => item.size === size);

    if (selectedSizeObject) {
      // alert(`Stock disponible: ${selectedSizeObject.stock}`);
    } else {
      alert("Tamaño no disponible.");
    }
  };

  const handleAddToCart = () => {
    const requiredProducts =
      productInfo.type === "2x1" ? 2 : productInfo.type === "3x2" ? 3 : 0;

    if (requiredProducts > 0 && selectedProducts.length !== requiredProducts) {
      alert(
        `Para esta promoción (${productInfo.type}), debes seleccionar exactamente ${requiredProducts} productos.`
      );
      return;
    }

    const productsWithoutSize = selectedProducts.filter(
      (product) => !product.selectedSize
    );

    if (productsWithoutSize.length > 0) {
      alert("Todos los productos seleccionados deben tener un talle.");
      return;
    }

    // Ordena los productos de mayor a menor precio
    const sortedProducts = [...selectedProducts].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );

    // Actualiza los precios según la promoción
    const updatedProducts = sortedProducts.map((product, index) => {
      if (productInfo.type === "2x1" && index === 1) {
        return { ...product, price: 0 };
      }

      if (productInfo.type === "3x2" && index === 2) {
        return { ...product, price: 0 };
      }

      if (productInfo.type === "Regalo" && product.isGift) {
        return { ...product, price: 0 };
      }

      return product;
    });

    // Calcular el monto descontado (discountAmount)
    const discountAmount = updatedProducts
      .filter((product) => product.price === 0)
      .reduce(
        (acc, product) =>
          acc +
          parseFloat(sortedProducts.find((p) => p.id === product.id).price),
        0
      );

    // Calcula el precio total sumando solo los precios de los productos que no son gratuitos
    const totalPrice = updatedProducts
      .filter((product) => product.price > 0)
      .reduce((acc, product) => acc + parseFloat(product.price), 0);

    const cartProducts = updatedProducts.map((product) => {
      const sizeInfo = product.selectedVariant?.sizes?.find(
        (size) => size.size === product.selectedSize
      );

      return {
        id: product.id,
        name: product.productName,
        quantity: 1,
        maxQuantity: sizeInfo?.stock || 1,
        size: product.selectedSize,
        image: product.selectedVariant.imgUrl[0],
        badge: productInfo.badge,
        price: product.price,
        color: product.color,
        variant: product.selectedVariant,
        dimensions: product.dimensions,
      };
    });

    dispatch(
      addToCart({
        id: productInfo.id,
        price: totalPrice.toFixed(2), // Asegúrate de que el precio tenga dos decimales
        quantity: 1,
        title: productInfo.title,
        description: productInfo.description,
        type: productInfo.type,
        disabled: productInfo.disabled,
        endDate: productInfo.endDate,
        promotion: true,
        discountAmount: discountAmount.toFixed(2), // Monto del descuento
        products: cartProducts,
      })
    );

    // alert("Productos añadidos al carrito.");
  };

  return (
    <div className="flex flex-col items-start gap-4 lg:w-[40%]">
      <div>
        <h1 className="text-3xl font-normal">{productInfo.title}</h1>
      </div>
      <p className="text-gray-700">
        {productInfo.description ? productInfo.description : ""}
      </p>
      <PaymentMethods />
      {/* Barra de búsqueda para productos promocionales */}
      <div className="relative w-full">
        <h2 className="text-xl font-semibold">Selecciona el Producto</h2>
        <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-md w-full">
          {showSearchBar ? (
            <>
              <button onClick={handleCloseSearchBar}>
                <IoIosArrowBack className="w-5 h-5" />
              </button>
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }}>
                <input
                  className="flex-grow outline-none w-full"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Buscar productos promocionales"
                />
              </motion.div>
            </>
          ) : (
            <button onClick={handleOpenSearchBar}>
              <FaSearch className="w-5 h-5 text-pink-600" />
            </button>
          )}
        </div>
        {showSearchBar && (
          <div className="absolute bg-white shadow-lg p-4 w-full max-h-96 overflow-y-auto z-50">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-2 border-b cursor-pointer"
                onClick={() => handleAddProductToPromotion(item)}
              >
                <img
                  src={thumbnailConvert(item.variants[0].imgUrl[0])}
                  alt={item.productName}
                  className="w-16 h-16"
                />
                <div>
                  <p className="font-bold">{item.productName}</p>
                  <p className="text-primeColor">${formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Barra de búsqueda para productos de regalo */}
      {productInfo.type === "Regalo" && (
        <div className="relative w-full">
          <h2 className="text-xl font-semibold">Selecciona el Regalo</h2>
          <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-md w-full">
            {showGiftSearchBar ? (
              <>
                <button onClick={handleCloseGiftSearchBar}>
                  <IoIosArrowBack className="w-5 h-5" />
                </button>
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }}>
                  <input
                    className="flex-grow outline-none w-full"
                    type="text"
                    value={giftSearchQuery}
                    onChange={handleGiftSearch}
                    placeholder="Buscar productos de regalo"
                  />
                </motion.div>
              </>
            ) : (
              <button onClick={handleOpenGiftSearchBar}>
                <FaSearch className="w-5 h-5 text-pink-600" />
              </button>
            )}
          </div>
          {showGiftSearchBar && (
            <div className="absolute bg-white shadow-lg p-4 w-full max-h-96 overflow-y-auto">
              {filteredGiftProducts.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-2 border-b cursor-pointer"
                  onClick={() => handleSelectGiftProduct(item)}
                >
                  <img
                    src={thumbnailConvert(item.variants[0].imgUrl[0])}
                    alt={item.productName}
                    className="w-16 h-16"
                  />
                  <div>
                    <p className="font-bold">{item.productName}</p>
                    <p className="text-primeColor">
                      ${formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="w-full">
        {selectedProducts.length > 0 ? (
          <h2 className="text-xl font-regular">Productos Seleccionados:</h2>
        ) : (
          ""
        )}

        {selectedProducts.map((product, index) => {
          const availableSizes = product.selectedVariant?.sizes
            ?.filter((size) => size.stock > 0)
            .map((size) => size.size);

          return (
            <div
              key={index}
              className="flex flex-col gap-2 p-2 border rounded w-full"
            >
              <p className="font-semibold">{product.productName}</p>
              <div className="flex gap-2 w-full">
                {product.variants?.map((variant) => (
                  <div
                    key={variant.id}
                    className={`cursor-pointer border ${
                      variant.id === product.selectedVariant?.id
                        ? "border-2 border-gray-800"
                        : ""
                    }`}
                    onClick={() => handleVariantChange(index, variant)}
                  >
                    <img
                      className="w-16 h-16"
                      src={thumbnailConvert(variant.imgUrl[0])}
                      alt={variant.name}
                    />
                  </div>
                ))}
              </div>

              <Sizes
                selectedSize={product.selectedSize}
                handleSize={(size) => handleSize(size, index)}
                productSizes={availableSizes}
                sizes={
                  product.cat === "Botines"
                    ? sizesBotines
                    : product.cat === "Zapatillas"
                    ? sizesBotines
                    : product.cat === "Camisetas"
                    ? sizesCamisetas
                    : product.cat === "Indumentaria"
                    ? sizesCamisetas
                    : productInfo.sub_cat === "Medias"
                    ? sizesMedias
                    : chanclasSizes
                }
              />

              <button
                className="text-pink-500 hover:bg-gray-100 duration-200"
                onClick={() => handleRemoveProductFromPromotion(index)}
              >
                Quitar
              </button>
            </div>
          );
        })}
        <div className="flex  w-full justify-start items-center gap-2 pt-4">
          <button
            onClick={handleAddToCart}
            className={`bg-[#fc148c] hover:bg-[#cd3a86] duration-300 flex justify-start text-white font-semibold py-3 px-4 lg:px-16 rounded-sm w-auto h-auto lg:h-full text-xl`}
          >
            Agregar al Carrito
          </button>
        </div>
        <div className="flex items-center justify-start gap-4 mt-2">
          <FaLock className="text-2xl" />
          <div className="flex flex-col">
            <p className="font-semibold">Compra Protegida</p>
            <p className="text-sm">
              Tus datos cuidados durante toda la compra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionInfo;
