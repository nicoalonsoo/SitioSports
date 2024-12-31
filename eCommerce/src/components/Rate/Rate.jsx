import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { shipping, spinner } from "../../assets/images";
import axios from "axios";
import { handleAuthToken } from "../../utils/authTokenCA";

const Rate = ({ dimensions, detailPrice }) => {
  const [cp, setCp] = useState("");
  const [rates, setRates] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const cartProducts = useSelector((state) => state.orebiReducer.cartProducts);
console.log(cartProducts);

const totalDimensions = cartProducts.reduce(
  (acc, product) => {
    // Si el producto es una promoción, iteramos sobre sus productos internos
    if (product.promotion && Array.isArray(product.products)) {
      const promoDimensions = product.products.reduce(
        (promoAcc, promoProduct) => ({
          weight: promoAcc.weight + (promoProduct.dimensions?.weight || 0),
          height: promoAcc.height + (promoProduct.dimensions?.height || 0),
          width: promoAcc.width + (promoProduct.dimensions?.width || 0),
          length: promoAcc.length + (promoProduct.dimensions?.length || 0),
        }),
        { weight: 0, height: 0, width: 0, length: 0 }
      );

      return {
        weight: acc.weight + promoDimensions.weight,
        height: acc.height + promoDimensions.height,
        width: acc.width + promoDimensions.width,
        length: acc.length + promoDimensions.length,
      };
    }

    // Caso normal: sumar las dimensiones del producto fuera de promociones
    return {
      weight: acc.weight + (product.dimensions?.weight || 0),
      height: acc.height + (product.dimensions?.height || 0),
      width: acc.width + (product.dimensions?.width || 0),
      length: acc.length + (product.dimensions?.length || 0),
    };
  },
  {
    weight: dimensions.weight,
    height: dimensions.height,
    width: dimensions.width,
    length: dimensions.length,
  }
);

  const product = {
    customerId: "0001374226",
    postalCodeOrigin: "4107",
    postalCodeDestination: cp,
    dimensions: totalDimensions,
  };

  useEffect(() => {
    const savedCp = localStorage.getItem("postalCode");
    if (savedCp) {
      setCp(savedCp);
      handleCalculateRate(savedCp);
    }
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      const cartTotalPrice = cartProducts.reduce(
        (acc, product) => acc + Number(product.price),
        0
      );
      setTotalAmount(cartTotalPrice + Number(detailPrice));
    } else {
      setTotalAmount(Number(detailPrice));
    }
  }, [cartProducts, detailPrice]);

  const getToken = async () => {
    const storedToken = JSON.parse(localStorage.getItem("correoToken"));
    const now = new Date();

    if (storedToken && new Date(storedToken.expire) > now) {
      return storedToken.token;
    } else {
      
      const newToken = await handleAuthToken();
      const newExpireDate = new Date();
      newExpireDate.setSeconds(newExpireDate.getSeconds() + 3600); // Ajusta el tiempo según el `expire` que recibes
      localStorage.setItem(
        "correoToken",
        JSON.stringify({ token: newToken, expire: newExpireDate.toISOString() })
      );
      return newToken;
    }
  };

  const handleCalculateRate = async (postalCode = cp) => {
    try {
      setIsLoading(true);
      localStorage.setItem("postalCode", postalCode);
      const token = await getToken();

      // Realizar una sola solicitud al back-end
      const response = await axios.post(
        "https://sitiosports-production.up.railway.app/rates",
        {
          dimensions: product.dimensions,
          postalCodeDestination: postalCode,
          token: token,
        }
      );

      // Acceder a ambas tarifas (domicilio y sucursal) en la respuesta
      const combinedRates = [
        { type: "Domicilio", rates: response.data.domicilio },
        { type: "Sucursal", rates: response.data.sucursal },
      ];

      setRates(combinedRates);
      setError("");
    } catch (error) {
      console.error("Error al calcular la tarifa:", error);
      setError("Hubo un error al calcular las tarifas. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  function formatDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(days));
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "numeric",
    });
  }

  return (
    <div>
      <div className="flex items-center gap-1">
        <img width={32} src={shipping} alt="Envío gratis" />
        <p>
          <span className="text-[#fc148c] font-bold">Medios de envío</span>
        </p>
      </div>

      {/* <p className="text-sm text-gray-700 mt-2">
        {cartProducts.length > 0
          ? `Sumando este producto, el envío queda en: $${totalAmount.toLocaleString()}`
          : `Total: $${totalAmount.toLocaleString()}`}
      </p> */}

      <div>
        <input
          type="text"
          placeholder="Tu código postal"
          value={cp}
          onChange={(e) => setCp(e.target.value)}
        />
        <button
          className="px-3 py-1 border-[1px] border-[#fc148c] flex items-center justify-center"
          onClick={() => handleCalculateRate(cp)}
          disabled={isLoading}
        >
          {isLoading ? (
            <img src={spinner} alt="Cargando..." width={24} />
          ) : (
            "Calcular"
          )}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <a
        className="text-xs hover:text-[#fc148c] underline"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.correoargentino.com.ar/formularios/cpa"
      >
        No sé mi código postal
      </a>

      <div className="mt-4">
        {rates.map((rateCategory) => (
          <div key={rateCategory.type} className="mb-4">
            <h3 className="font-bold text-lg">
              {rateCategory.type === "Domicilio"
                ? "Envío a domicilio"
                : "Retirar por"}
            </h3>

            {rateCategory.type === "Sucursal" && (
              <p className="text-sm text-gray-600 mt-1 underline">
                En el checkout podrás ver y seleccionar tu sucursal más cercana.
              </p>
            )}

            {rateCategory.rates
              .filter((rate) => rate.productName.includes("Clasico")) // Filtra solo los envíos "Expreso"
              .map((rate, index) => (
                <div key={index} className="border-b border-gray-300 py-2">
                  <p className="font-bold">{rate.productName}</p>
                  <p>
                    Precio:{" "}
                    {rateCategory.type === "Sucursal" && totalAmount > 35000
                      ? "Gratis"
                      : `$${rate.price.toLocaleString()}`}
                  </p>
                  <p>
                    Llega entre el {formatDate(rate.deliveryTimeMin)} y el{" "}
                    {formatDate(rate.deliveryTimeMax)}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rate;
