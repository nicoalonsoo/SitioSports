import React, { useState, useEffect } from "react";
import { shipping, spinner } from "../../assets/images";
import axios from "axios";
import { handleAuthToken } from "../../utils/authTokenCA";
import { provinces } from "../../constants";

const ShippingOptions = ({
  onShippingSelect,
  products,
  handleClickShippingType,
  state,
  totalAmt
}) => {
  const [cp, setCp] = useState("");
  const [rates, setRates] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [nearbyAgencies, setNearbyAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [selectedAgencyRate, setSelectedAgencyRate] = useState(null);

  useEffect(() => {
    const savedCp = localStorage.getItem("postalCode");
    if (savedCp) {
      setCp(savedCp);
      handleCalculateRate(savedCp);
    }
  }, []);

  useEffect(() => {
    const province = provinces.find((prov) => prov.name === state);
    setSelectedProvince(province || null);
  }, [state]);

  useEffect(() => {
    if (selectedProvince) {
      fetchNearbyAgencies(selectedProvince.provinceCode);
    }
  }, [selectedProvince]);

  const calculateDimensions = (products) => {
    let totalWeight = 0;
    let maxWidth = 0;
    let maxLength = 0;
    let totalHeight = 0;

    products.forEach((product) => {
      const { weight, width, length, height } = product.dimensions;
      const quantity = product.quantity || 1;

      totalWeight += weight * quantity;
      maxWidth = Math.max(maxWidth, width);
      maxLength = Math.max(maxLength, length);
      totalHeight += height * quantity;
    });

    return {
      weight: totalWeight,
      width: maxWidth,
      length: maxLength,
      height: totalHeight,
    };
  };

  const dimensions = calculateDimensions(products);

  const product = {
    customerId: "0001374226",
    postalCodeOrigin: "4107",
    postalCodeDestination: cp,
    dimensions,
  };

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

      const responses = await Promise.all([
        axios.post(
          "https://api.correoargentino.com.ar/micorreo/v1/rates",
          { ...product, postalCodeDestination: postalCode, deliveredType: "D" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        ),
        axios.post(
          "https://api.correoargentino.com.ar/micorreo/v1/rates",
          { ...product, postalCodeDestination: postalCode, deliveredType: "S" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        ),
      ]);

      const combinedRates = [
        { type: "Domicilio", rates: responses[0].data.rates },
        { 
          type: "Sucursal", 
          rates: responses[1].data.rates.map(rate => ({
            ...rate,
            price: totalAmt > 35000 ? 0 : rate.price // Establece el precio a 0 si totalAmt > 35000
          }))
        },
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

  const fetchNearbyAgencies = async (provinceCode) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `https://api.correoargentino.com.ar/micorreo/v1/agencies?customerId=0000550997&provinceCode=${provinceCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const agencies = response.data.filter((agency) =>
        agency.nearByPostalCode?.split(",").includes(cp)
      );
      setNearbyAgencies(agencies);
    } catch (error) {
      console.error("Error fetching agencies:", error);
      setError("Hubo un error al obtener las agencias. Inténtalo de nuevo.");
    }
  };

  const handleSelectRate = (rate) => {
    setSelectedRate(rate);
    setSelectedAgencyRate(null); // Desmarca la tarifa de sucursal
    handleClickShippingType(rate.price, rate);
  };

  const handleSelectAgency = (e) => {
    setSelectedAgency(e.target.value);
    setSelectedRate(null); // Desmarca la tarifa de domicilio
    setSelectedAgencyRate(null); // Reinicia la tarifa seleccionada cuando se cambia la agencia
    handleClickShippingType(null, null);
  };

  const handleSelectAgencyRate = (rate) => {
    const rateWithAgencyAddress = {
      ...rate,
      agencyAddress: selectedAgency
    };
    setSelectedAgencyRate(rate);
    setSelectedRate(rate); // Desmarca la tarifa de domicilio
    handleClickShippingType(rate.price, rateWithAgencyAddress);
  };
  return (
    <div>
      <div className=" ">
        <input
          className="border-b-[1px] border-[#fc148c] py-1 focus:outline-none focus:ring-[1px] focus:ring-[#fc148c]"
          type="text"
          placeholder="Tu código postal"
          value={cp}
          onChange={(e) => setCp(e.target.value)}
        />
        <button
          className="px-3 py-1 border-[1px] border-[#fc148c] hover:text-white hover:bg-[#fc148c] duration-300"
          onClick={() => handleCalculateRate(cp)}
        >
          Calcular
        </button>
      </div>
      <div className="flex items-center gap-1">
        <img width={32} src={shipping} alt="Envío gratis" />
        <p>
          <span className="text-[#fc148c] font-bold">
            Selecciona tu método de envío
          </span>
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {isLoading ? (
        <div className="flex justify-center">
          <img src={spinner} alt="Cargando..." width={50} />
        </div>
      ) : (
        <div className="mt-4">
          {rates.map((rateCategory) => (
            <div key={rateCategory.type} className="mb-4">
              <h3 className="font-bold text-lg">
                {rateCategory.type === "Domicilio"
                  ? "Envío a domicilio"
                  : "Retirar por"}
              </h3>
              {rateCategory.type === "Domicilio" ? (
                rateCategory.rates.map((rate, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedRate === rate
                        ? "border-[3px] border-[#e46dc7] shadow-sm"
                        : "border-[1px] border-gray-700"
                    } w-full lg:w-3/5 flex justify-between p-4 cursor-pointer hover:bg-gray-50`}
                    onClick={() => handleSelectRate(rate)}
                  >
                    <div>
                      <h1 className="text-lg font-bold">{rate.productName}</h1>
                      <h1 className="text-lg text-gray-600">Envío a Domicilio</h1>
                      <h1 className="text-md font-semibold text-gray-700">
                        {rate.deliveryTimeMin} - {rate.deliveryTimeMax} días
                        hábiles
                      </h1>
                    </div>
                    <div>
                      {rate.price === 0 ? "Gratis" : `$${rate.price.toLocaleString()}`}
                    </div>
                  </div>
                ))
              ) : (
                <div className="border-[1px] border-gray-700 w-full lg:w-3/5 p-4">
                  <h1 className="text-lg font-bold">Retiro en Sucursal</h1>
                  <select
                    className="border border-gray-300 rounded w-full p-2 mt-2"
                    value={selectedAgency}
                    onChange={handleSelectAgency}
                  >
                    <option value="">Elige una sucursal...</option>
                    {nearbyAgencies.map((agency, index) => (
                      <option key={index} value={` ${agency.name} - ${agency.location.address.streetName}, ${agency.location.address.streetNumber}, ${agency.location.address.locality}`}>
                        {agency.name} - {agency.location.address.streetName}{" "}
                        {agency.location.address.streetNumber},{" "}
                        {agency.location.address.locality}
                      </option>
                    ))}
                  </select>

                  {selectedAgency && (
                    <div className="mt-4">
                      {rateCategory.rates.map((rate, index) => (
                        <div
                          key={index}
                          className={`${
                            selectedAgencyRate === rate
                              ? "border-[3px] border-[#e46dc7] shadow-sm"
                              : "border-[1px] border-gray-700"
                          } w-full lg:w-3/5 flex justify-between p-4 cursor-pointer hover:bg-gray-50`}
                          onClick={() => handleSelectAgencyRate(rate)}
                        >
                          <div>
                            <h1 className="text-lg font-bold">{rate.productName}</h1>
                            <h1 className="text-md font-semibold text-gray-700">
                              {rate.deliveryTimeMin} - {rate.deliveryTimeMax} días
                              hábiles
                            </h1>
                          </div>
                          <div>
                            {rate.price === 0 ? "Gratis" : `$${rate.price.toLocaleString()}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShippingOptions;
