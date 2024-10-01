import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersFromBackend } from "../../utils/api";
import { setBackendOrders } from "../../redux/orebiSlice";

const AfterMp = () => {
  const { orden } = useParams(); // Aquí obtienes el número de la orden desde los params
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orebiReducer.orders); // Las órdenes almacenadas en Redux
  const [order, setOrder] = useState(null); // Almacena la orden encontrada

  useEffect(() => {
    // Fetch de las órdenes al cargar el componente
    const fetchData = async () => {
      try {
        const orders = await fetchOrdersFromBackend();
        dispatch(setBackendOrders(orders)); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      // Filtrar la orden por `order_number` usando el param de la URL
      const foundOrder = orders.find((order) => order.order_number === parseInt(orden, 10));
      if (foundOrder) {
        console.log(foundOrder);
        
        setOrder(foundOrder);
        
        // Enviar evento a GTM solo si la orden fue encontrada
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "Purchase", 
          eventCategory: "Purchase", 
          transaction_id: foundOrder.order_number, // ID de la orden
          value: foundOrder.transaction_amount, // Valor de la compra
          currency: "ARS", // Moneda
          content_type: "product", // Tipo de contenido
          email: foundOrder.email,  // Correo del usuario
          full_name: foundOrder.name,  // Nombre completo del usuario
          phone_number: foundOrder.phone,  // Número de teléfono
        });
      }
    }
  }, [orders, orden]);

  return (
    <div className="px-4 lg:px-20 flex justify-center">
      <div className="flex justify-center items-start py-20 w-full lg:w-2/3 gap-6">
        <div className="flex flex-col justify-start items-start space-y-6">
          {order ? (
            <>
              <h1 className="text-3xl font-normal">Orden de compra: #{order.order_number}</h1>
              <h1 className="text-xl text-pink-600 font-semibold">Su compra fue exitosa!</h1>
              <p>Muchas gracias por comprar en Sitio Sports</p>
              <p>
                Cualquier consulta puede ser realizada al siguiente número de Whatsapp 
                <a className='underline hover:text-pink-600' href="https://wa.me/+5493812097082" target="_blank">
                  (54 9 3813624693)
                </a>, también le pedimos amablemente que nos indique el número de orden de su compra.
              </p>
            </>
          ) : (
            <h1 className="text-2xl font-semibold">Cargando detalles de la compra...</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default AfterMp;
