import React, { useEffect, useState } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersFromBackend } from "../../utils/api";
import { setBackendOrders } from "../../redux/orebiSlice";
import formatPrice from "../../utils/formatPrice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AfterTransfer = () => {
  const { orden } = useParams(); // Obtener el número de orden de los params
  const query = useQuery();
  const precio = query.get("monto"); // Obtener el monto de la URL (por query params)
  
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orebiReducer.orders); // Obtener las órdenes de Redux
  const [order, setOrder] = useState(null); // Estado local para almacenar la orden específica

  // Cargar las órdenes del backend y guardarlas en Redux
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrders = await fetchOrdersFromBackend();
        dispatch(setBackendOrders(fetchedOrders)); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Encontrar la orden por su número
  useEffect(() => {
    if (orders.length > 0) {
      const foundOrder = orders.find((order) => order.order_number === parseInt(orden, 10));
      if (foundOrder) {
        setOrder(foundOrder);

        // Enviar el evento Purchase a Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "Purchase",
          eventCategory: "Purchase", 
          transaction_id: foundOrder.order_number, // Número de la orden
          value: foundOrder.transaction_amount, // Monto de la transacción
          currency: "ARS", // Moneda en pesos argentinos
          content_type: "product", // Tipo de contenido
          email: foundOrder.email, // Correo del usuario
          full_name: foundOrder.name, // Nombre completo del usuario
          phone_number: foundOrder.phone, // Teléfono del usuario
        });
      }
    }
  }, [orders, orden]);

  return (
    <div className="px-4 lg:px-20 flex justify-center">
      <div className="flex flex-col justify-center items-start py-20 w-full lg:w-2/3 gap-6">
        <h1 className="text-3xl font-normal">
          Orden de compra: <span className=" text-pink-600">#{orden}</span>
        </h1>
        <div className="flex justify-center items-start">
          <div>
            <GiSandsOfTime className="text-5xl text-pink-600" />
          </div>
          <div className="flex flex-col justify-start items-start space-y-6">
            <h1 className="text-2xl lg:text-3xl font-semibold">
              En espera de pago por el monto de ${formatPrice(precio)} ars.
            </h1>
            <p>Hola como estas?</p>
            <p>
              Podes hacer la trasnferencia o depósito en la siguiente cuenta.
            </p>
            <div>
              <p>TITULAR: SITIO SPORTS S. A. S.</p>
              <p>CVU: 0000003100002741761918</p>
              <p className="uppercase">ALIAS: sitiosports.sas</p>
              <p>CUIT/CUIL: 30-71844900-2</p>
            </div>
            <p>
              Por favor enviar comprobante mediante WhatsApp{" "}
              <a
                className="underline text-pink-600"
                href="https://wa.me/+5493812097082"
                target="_blank"
              >
                (+54 9 3812 09‑7082)
              </a>
              , hasta no enviar el comprobante no es computada la compra. (Por
              favor si es posible enviar en formato documento, es necesario que
              se vea el código de operación, fecha, importe y destino). También
              le pedimos amablemente que nos indique el número de orden de su
              compra.
            </p>
            <p>Gracias por tu compra!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterTransfer;
