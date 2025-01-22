import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import {
  resetCart,
  deleteItem,
  increaseQuantity,
  drecreaseQuantity,
  updatePrice,
  updateDisabledPromotion,
  setBackendProducts,
  setBackendPromotions,
} from "../../redux/orebiSlice";
import {
  fetchProductsFromBackend,
  fetchPromotionsFromBackend,
} from "../../utils/api";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { IoIosInformationCircleOutline } from "react-icons/io";
import RecommendProducts from "../../components/pageProps/RecommendProducts/RecommendProducts";
import formatPrice from "../../utils/formatPrice";
import { RxCross2 } from "react-icons/rx";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.cartProducts);
  const allProducts = useSelector((state) => state.orebiReducer.products);
  const allPromotions = useSelector((state) => state.orebiReducer.promotions);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [normalProducts, setNormalProducts] = useState([]);
  const [promotionalDiscount, setPromotionalDiscount] = useState("");
  console.log(products);
  console.log(promotions);

  useEffect(() => {
    // Calcular el monto total
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    setShippingCharge(0);
  }, [totalAmt]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProductsFromBackend();
        const activeProducts = products.filter((product) => !product.disabled);
        dispatch(setBackendProducts(activeProducts));
        const promotions = await fetchPromotionsFromBackend();
        const activePromotions = promotions.promotion.filter(
          (product) => !product.disabled
        );
        dispatch(setBackendPromotions(activePromotions));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Separar productos en promociones y normales
    const promoItems = products.filter((item) => item.promotion);
    const normalItems = products.filter((item) => !item.promotion);

    setPromotions(promoItems);
    setNormalProducts(normalItems);

    // Calcular la suma de discountAmount de todas las promociones
    const totalDiscount = promoItems.reduce(
      (acc, item) => acc + parseFloat(item.discountAmount || 0),
      0
    );

    // Guardar el total del descuento en una variable o estado
    setPromotionalDiscount(totalDiscount); // Asumiendo que tienes un estado para esto
  }, [products]);

  useEffect(() => {
    // Verificar actualizaciones de precios y stock
    products.forEach((cartItem) => {
      const foundProduct = allProducts.find(
        (product) => product.id === cartItem.id
      );
      if (foundProduct) {
        if (cartItem.price !== foundProduct.price) {
          dispatch(
            updatePrice({ id: cartItem.id, newPrice: foundProduct.price })
          );
          toast.info(
            `El precio de ${cartItem.name} ha cambiado a $${foundProduct.price}.`,
            {
              autoClose: 10000,
            }
          );
        }

        const foundVariant = foundProduct.variants.find(
          (variant) => variant.id === cartItem.variant.id
        );

        if (foundVariant) {
          const foundSize = foundVariant.sizes.find(
            (size) => size.size === cartItem.size
          );
          if (foundSize) {
            if (foundSize.stock < cartItem.quantity) {
              const difference = cartItem.quantity - foundSize.stock;
              for (let i = 0; i < difference; i++) {
                dispatch(drecreaseQuantity({ id: cartItem.id }));
              }
              toast.info(
                `${cartItem.name} ahora tiene ${foundSize.stock} unidades disponibles.`,
                { autoClose: 10000 }
              );
              if (foundSize.stock === 0) {
                dispatch(deleteItem({ id: cartItem.id, size: cartItem.size }));
                toast.error(
                  `${cartItem.name} fue quitado del carrito por falta de stock.`,
                  { autoClose: 10000 }
                );
              }
            }
          }
        }
      }
    });
  }, [products, allProducts]);

  useEffect(() => {
    // Verificar si alguna promoción en el carrito está deshabilitada o eliminada
    products.forEach((cartItem) => {
      if (cartItem.promotion) {
        // Buscar la promoción en allPromotions
        const foundPromotion = allPromotions.find(
          (promotion) => promotion.id === cartItem.id
        );

        if (!foundPromotion || foundPromotion.disabled) {
          // Si la promoción no existe o está deshabilitada, eliminar el producto del carrito
          dispatch(deleteItem({ id: cartItem.id, size: cartItem.size }));
          toast.error(
            `La promoción asociada a "${cartItem.title}" ha sido ${
              !foundPromotion ? "eliminada" : "deshabilitada"
            } y se quitó del carrito.`,
            { autoClose: 10000 }
          );
        }
      }
    });
  }, [products, allPromotions, dispatch]);

  const handlePaymentGateway = () => {
    const items = [];

    products.forEach((product) => {
      if (product.promotion) {
        // Si es una promoción, agregar cada producto dentro de ella al array de items
        product.products.forEach((promoProduct) => {
          items.push({
            id: promoProduct.id,
            name: promoProduct.name,
            quantity: promoProduct.quantity,
            size: promoProduct.size,
            image: promoProduct.image,
            price: promoProduct.price, // Puede ser 0 si aplica
            color: promoProduct.color || null,
            variant: promoProduct.variant || null, // Validar que exista la propiedad
          });
        });
      } else {
        // Si es un producto normal, agregarlo directamente al array de items
        items.push({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          size: product.size,
          image: product.image,
          price: product.price,
          color: product.color || null,
          variant: product.variant || null, // Validar que exista la propiedad
          dimensions: product.dimensions || null, // Opcional, si es requerido
        });
      }
    });

    //   Navegar al gateway de pagos con los items procesados
    navigate(`/paymentgateway`, {
      state: {
        item: items,
        shippingCharge,
      },
    });
  };

  let numberOfProducts = 0;

  // Sumar las cantidades de los productos normales
  if (normalProducts) {
    numberOfProducts += normalProducts.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
  }

  // Sumar la cantidad de productos en las promociones
  if (promotions) {
    numberOfProducts += promotions.reduce(
      (acc, promotion) => acc + (promotion.products?.length || 0),
      0
    );
  }
  return (
    <div className="flex flex-col max-w-container mx-auto px-3 lg:px-32 relative">
      <div className="absolute top-10 right-4 lg:right-24 flex items-center gap-3 w-[200px]">
        <img
          className="w-10 rounded-md"
          src="https://d1zxmlch3z83cq.cloudfront.net/production/2.3.41/_next/server/static/img/safe-shopping.svg"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">COMPRA SEGURA</p>
          <p className="text-sm"> 100% PROTEGIDA</p>
        </div>
      </div>
      <Breadcrumbs title="Tu Carrito" />
      {products.length > 0 ? (
        <div className="flex flex-wrap lg:flex-col lg:flex-nowrap pb-20">
          <div className="flex gap-4 items-center">
            <IoIosInformationCircleOutline className="text-4xl text-pink-500" />
            <p className="text-md text-left">
              Los artículos en tu carrito no están reservados. <br />
              Terminá el proceso de compra ahora para hacerte con ellos.
            </p>
          </div>

          {/* Sección de productos */}
          <div className="flex flex-wrap lg:flex-nowrap justify-between items-start mt-5">
            <div className="w-full">
              {/* Sección de Promociones */}
              {promotions.length > 0 &&
                promotions.map((promotion) => (
                  <div className="w-full  mt-5 mb-6">
                    <div className="w-full flex justify-start items-center">
                      <h2 className="text-xl font-semibold text-left mb-3">
                        {promotion.title}
                      </h2>
                      <div className="flex items-center py-4 px-4">
                        <RxCross2
                          onClick={() =>
                            dispatch(deleteItem({ id: promotion.id }))
                          }
                          className="text-primeColor text-xl -mt-2 hover:bg-pink-200 hover:text-gray-500 duration-300 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full lg:w-2/3">
                      {promotion.products?.map((item) => (
                        <div key={item.id} className="w-full lg:w-full">
                          <ItemCard item={item} promotion={true} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Productos normales */}
              <div className="w-full lg:w-2/3 flex flex-wrap justify-start items-start">
                {normalProducts.map((item) => (
                  <div className="w-full" key={item.id}>
                    <ItemCard item={item} />
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen del Pedido */}
            <div className="w-full lg:w-1/3 gap-4 flex">
              <div className="w-full flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-left">
                  Resumen Del Pedido
                </h1>
                <div>
                  <p className="flex items-center justify-between border-b-0 py-1.5 text-lg font-medium">
                    {numberOfProducts === 1
                      ? "1 Producto"
                      : `${numberOfProducts} productos`}
                    <span className="font-normal tracking-wide font-titleFont">
                      ${formatPrice(totalAmt)}
                    </span>
                  </p>
                  {promotions.length > 0 ? (
                    <p className="flex items-center justify-between border-b-0 py-1.5 text-lg font-medium">
                      Estas ahorrando
                      <span className="font-normal tracking-wide font-titleFont">
                        -${formatPrice(promotionalDiscount)}
                      </span>
                    </p>
                  ) : (
                    ""
                  )}
                  <p className="flex items-center font-bold justify-between py-1.5 text-lg">
                    Total
                    <span className="font-bold tracking-wide text-lg font-titleFont">
                      $
                      {shippingCharge === "Gratis"
                        ? formatPrice(totalAmt)
                        : formatPrice(totalAmt + shippingCharge)}
                    </span>
                  </p>
                </div>
                <div className="w-full flex justify-end">
                  <button
                    className="font-semibold w-full h-10 bg-[#fc148c] text-white hover:bg-[#a73771] hover:scale-105 duration-300"
                    onClick={handlePaymentGateway}
                  >
                    CONTINUAR COMPRA
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="w-full lg:w-1/5 py-2 px-10 bg-gray-800 text-white font-semibold uppercase hover:bg-red-700 duration-300"
          >
            Resetear
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Tu carrito se encuentra vacío.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Tu carrito de compras vive para servir, dale un propósito.
            </p>
            <Link to="/catalogo">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Ir al Catálogo
              </button>
            </Link>
          </div>
        </motion.div>
      )}
      <div>
        <RecommendProducts />
      </div>
    </div>
  );
};

export default Cart;
