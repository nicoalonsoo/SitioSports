import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import formatPrice from "../../utils/formatPrice";
import AddressForm from "../../components/PayerForm/AddressForm";
import ContactForm from "../../components/PayerForm/ContactForm";
import { tarjetas, otherPaymentMethods } from "../../constants/index";

const Payment = () => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.orebiReducer.cartProducts);
  const [resume, setResume] = useState(false);
  const [email, setEmail] = useState("");
  const [contactReady, setContactReady] = useState(false);
  const [addressReady, setAddressReady] = useState(false);
  const [readyToPay, setReadyToPay] = useState(false);
  const [productInfo, setProductInfo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // el tipo de metodo de pago, mp o tb
  const [shipping, setShipping] = useState(""); // el tipo de envio
  const [shippmentCharge, setShippmentCharge] = useState(0); //el costo del envio
  const [shipmentPlusTotal, setShipmentPlusTotal] = useState(0); //el total mas el costo del envio
  const [totalAmt, setTotalAmt] = useState(""); //el total de los productos
  const [transferDiscount, setTransferDiscount] = useState(0); //el dinero que se ahorra el cliente usando transferencia
  const [processing, setProcessing] = useState(false); //avisa cuando se esta procesando la orden
  const location = useLocation();

  const [order, setOrder] = useState({
    productInfo: "",
    payerInfo: "",
    shipment: "",
  });

  // Estado para el cupón de descuento
  const [couponCode, setCouponCode] = useState("");
  const [couponValid, setCouponValid] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponSent, setCouponSent] = useState(false)

  useEffect(() => {
    setProductInfo(location.state.item);
    setResume(true);
    setShippmentCharge(location.state.shippingCharge);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "InitiateCheckout", 
      eventCategory: "InitiateCheckout", 
      content_ids: [productInfo.id],  // ID del producto
      content_name: productInfo.productName,  // Nombre del producto
      content_type: "product",  // Tipo de contenido
      value: productInfo.price,  // Precio del producto
      currency: "ARS",  // Moneda
    });
  }, [location]);

  useEffect(() => {
    let price = 0;
    if (productInfo !== "") {
      productInfo?.map((item) => {
        price += item.price * item.quantity;
        return price;
      });
      setTotalAmt(price);
    }
  }, [productInfo]);

  useEffect(() => {
    let finalAmount;
    
    // Cálculo inicial según el método de pago
    if (paymentMethod === "tb") {
      // Si es transferencia bancaria (tb), aplicar el 15% de descuento
      if (shippmentCharge === "Gratis") {
        finalAmount = totalAmt * 0.85;
      } else {
        finalAmount = (totalAmt + shippmentCharge) * 0.85;
      }
      let disc = totalAmt * 0.15;
      setTransferDiscount(disc);
    } else {
      // Si es otro método de pago
      if (totalAmt !== "" && totalAmt > 45000) {
        finalAmount = totalAmt;
      } else {
        finalAmount = totalAmt + shippmentCharge;
      }
    }
  
    // Aplicar el cupón si es válido
    if (couponValid && couponDiscount > 0) {
      finalAmount = finalAmount - (finalAmount * couponDiscount) / 100;
    }
  
    // Actualizamos el total final con descuento por transferencia o cupón
    setShipmentPlusTotal(finalAmount);
  }, [totalAmt, shippmentCharge, paymentMethod, couponDiscount, couponValid]);
  
  

  useEffect(() => {
    let finalAmount;
    if (shippmentCharge !== 0) {
      finalAmount = totalAmt + shippmentCharge;
    } else {
      finalAmount = totalAmt;
    }
    setShipmentPlusTotal(finalAmount);
    setOrder((prevOrder) => ({
      ...prevOrder,
      shipment: shippmentCharge,
    }));
  }, [totalAmt, shippmentCharge]);



  const handlePay = async () => {
    if (paymentMethod === "mp") {
      try {
        setProcessing(true);
        const response = await axios.post(
          "https://sitiosports-production.up.railway.app/create-order",
          order
        );
        const preferenceId = response.data.id;
        const redirectUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
        dispatch(resetCart());
        window.location.href = redirectUrl;
        setProcessing(false);
      } catch (error) {
        console.error("Error creating order:", error);
        setProcessing(false);
      }
    } else {
      try {
        setProcessing(true);
        const postOrder = {
          items: productInfo,
          name: order.payerInfo.payerName,
          email: order.payerInfo.email,
          client_id: order.payerInfo.client_id,
          phone: order.payerInfo.phone,
          shipment: {
            zipCode: order.payerInfo.zipCode,
            state_name: order.payerInfo.state,
            city_name: order.payerInfo.city,
            street_name: order.payerInfo.street,
            street_number: order.payerInfo.streetNumber,
            floor: order.payerInfo.floor,
            aclaration: order.payerInfo.aclaration,
          },
          order_type: "Transferencia Bancaria",
          status: "Pago Pendiente",
          status_detail: "Cliente debe realizar la transferencia",
          transaction_amount: shipmentPlusTotal,
          shipping_amount: 0,
          transaction_details: {
            net_received_amount: shipmentPlusTotal,
            total_paid_amount: totalAmt,
          },
          shipping_type: shipping,
        };
        const responsePost = await axios.post(
          "https://sitiosports-production.up.railway.app/order",
          postOrder
        );
        const order_number = responsePost.data.order_number;
        navigate(
          `/orden-transferencia-confirmada/${order_number}?monto=${shipmentPlusTotal}`
        );
        dispatch(resetCart());
        setProcessing(false);
      } catch (error) {
        console.error("Error creating order:", error);
        setProcessing(false);
      }
    }
  };

  const handleSubmitContact = (email) => {
    setEmail(email);
    setContactReady(true);
  };

  const handleAddress = (addressForm) => {
    setOrder({
      productInfo: productInfo,
      payerInfo: addressForm,
    });
    setAddressReady(true);
console.log(addressForm);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "AddPaymentInfo", 
      eventCategory: "AddPaymentInfo", 
      content_ids: [order.productInfo.id],  // ID del producto
      content_name: order.productInfo.productName,  // Nombre del producto
      content_type: "product",  // Tipo de contenido
      value: order.productInfo.price,  // Precio del producto
      currency: "ARS",  // Moneda
      customer_id: addressForm.client_id || null,  // ID del cliente si está registrado
      email: addressForm.email,  // Correo del usuario
      full_name: addressForm.payerName,  // Nombre completo del usuario
      phone_number: addressForm.phone,  // Número de teléfono
    });
  };

  const handleEditMail = () => {
    setAddressReady(false);
  };

  const handleClickShippingType = (value) => {
    setShipping(value);
    if (value === "Domicilio" && shipping !== "Domicilio") {
      setShippmentCharge(shippmentCharge + 2350);
    } else if (value === "Domicilio" && shipping === "Domicilio") {
      setShippmentCharge(shippmentCharge);
    } else if (value === "estandar") {
      setShippmentCharge(0);
    }
    setPaymentMethod("");
  };



  // Función para validar y aplicar el cupón
  const handleApplyCoupon = async () => {
    
    try {
      const usageRecord = {
        //userId: 1234,  // Aquí puedes agregar el ID del usuario que aplica el cupón
        // orderId: 5678, // Aquí puedes agregar el ID de la orden donde se usó el cupón
        dateUsed: new Date(), // Fecha en que se aplicó el cupón
      };

      const response = await axios.put(
        `https://sitiosports-production.up.railway.app/discounts/${couponCode}`, // Usamos PUT y pasamos el code como parámetro
        { usageRecord } // Mandamos el registro de uso en el body
      );

      const { valid, discount } = response.data;

      if (valid) {
        setCouponValid(true);
        setCouponDiscount(discount); // Aplica el descuento retornado
        alert(`Cupón aplicado: ${discount}% de descuento`);
      } else {
        setCouponValid(false);
        alert("Código de cupón no válido o no tiene usos disponibles");
      }
      setCouponSent(true);
    } catch (error) {
      console.error("Error al aplicar el cupón:", error);
      alert("Hubo un error al aplicar el cupón.");
      setCouponSent(true);
    }
  };

  return (
    <div className="flex flex-wrap w-screen h-full justify-start items-start px-2 lg:px-32 xl:px-44 pb-20 relative">
      <div className="lg:hidden w-full lg:w-1/3 p-2 gap-4 flex flex-col">
        <button
          className="flex justify-between items-center text-left  text-gray-700 py-2  rounded"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="flex items-center  gap-2">
            <IoIosArrowDown
              className={`${
                showDetails ? "rotate-180" : ""
              } text-[#fc148c] duration-300`}
            />
            {showDetails
              ? "Ocultar Detalle de Compra"
              : "Ver Detalle de Compra"}
          </div>
          <span className="font-bold tracking-wide text-xl text-[#fc148c]">
            ${shipmentPlusTotal}
          </span>
        </button>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showDetails ? "auto" : 0,
            opacity: showDetails ? 1 : 0,
          }}
          className="overflow-hidden lg:overflow-visible lg:h-auto lg:opacity-100  "
        >
          <div className="sticky top-0 border-gray-700 w-full flex flex-col gap-4 mb-10">
            <h1 className="text-2xl font-semibold text-left">
              Resumen Del Pedido
            </h1>
            <div className="w-full gap-y-4">
              {products?.map((product) => (
                <div key={product.id} className="flex justify-between gap-6">
                  <div className="w-24">
                    <img
                      className="w-full"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="w-full text-gray-800">
                    <p>
                      {product.name} {product.variant.variant}
                      <span>
                        ({product.size}) x{product.quantity}
                      </span>
                    </p>
                    <p>${product.price} c/u</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="flex items-center justify-between border-b-0 py-1.5 text-lg font-medium">
                Subtotal
                <span className="font-semibold tracking-wide font-titleFont">
                  ${formatPrice(totalAmt)}
                </span>
              </p>
              <p className="flex items-center justify-between py-1.5 text-lg font-medium">
                Costo de envío
                <span className="font-semibold tracking-wide font-titleFont">
                  {shipping === "estandar"
                    ? "Gratis"
                    : `$${formatPrice(shippmentCharge)}`}
                </span>
              </p>
              {paymentMethod === "tb" && transferDiscount !== 0 ? (
                <p className="flex items-center justify-between border-b-0 py-1.5 text-lg font-medium">
                  Descuento
                  <span className="font-semibold tracking-wide font-titleFont">
                    -${formatPrice(transferDiscount)}
                  </span>
                </p>
              ) : (
                ""
              )}
              <p className="flex items-center justify-between text-pink-600 py-1.5 text-xl font-bold">
                Total
                <span className="font-bold tracking-wide text-xl font-titleFont">
                  ${formatPrice(shipmentPlusTotal)}
                </span>
              </p>
              <div className="my-4">
                <p className="text-lg font-semibold">Cupón de Descuento</p>
                <div className="flex gap-2 items-center mt-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Ingresa tu código"
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-primeColor text-white px-4 py-2 rounded hover:bg-pink-600 duration-300"
                  >
                    Aplicar
                  </button>
                </div>
                {couponValid && couponDiscount > 0 && couponSent && (
                  <p className="text-green-600 mt-2">
                    Cupón aplicado: {couponDiscount}% de descuento
                  </p>
                )}
                {!couponValid && couponCode !== "" && couponSent && (
                  <p className="text-red-600 mt-2">Cupón no válido</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full lg:w-2/3 justify-between space-y-6">
        <div className="w-full flex flex-wrap justify-start ">
          <div className="w-full lg:w-1/3">
            <p className="font-bold text-2xl text-left uppercase">
              Tu Contacto
            </p>
            <div className="w-full">
              {!readyToPay ? (
                <ContactForm handleSubmitContact={handleSubmitContact} />
              ) : (
                <div className="w-full lg:w-1/2  p-3">
                  <p className="font-bold">
                    <span className="font-normal">{email}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="h-auto w-auto text-black ">
            {addressReady ? (
              <button
                onClick={handleEditMail}
                className="p-2 border-[1px] border-gray-300 rounded-sm hover:bg-gray-700 hover:text-gray-200"
              >
                Editar
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="w-full flex justify-start ">
          <div className="w-full lg:w-3/5">
            <hr className="border-[1.5px] border-[#e279c84d]" />
          </div>
        </div>
        <div className="w-full">
          <p className="font-bold text-2xl pb-3 uppercase">Tu Dirección</p>
          <div className="">
            {!addressReady && contactReady ? (
              <AddressForm
                handleAddress={handleAddress}
                email={email}
                payerInfo={order.payerInfo ? order.payerInfo : ""}
              />
            ) : (
              ""
            )}
            {addressReady ? (
              <div className="py-4 text-gray-600">
                <h1 className="text-gray-800 font-bold uppercase">
                  Dirección de envío
                </h1>
                <p>{order.payerInfo.payerName}</p>
                <p>{order.payerInfo.phone}</p>
                <p>{order.payerInfo.zipCode}, AR</p>
                <p>{order.payerInfo.state}</p>
                <p>{order.payerInfo.city}</p>
                <p>{order.payerInfo.street}</p>
                <p>{order.payerInfo.streetNumber}</p>
                <p>{order.payerInfo.floor}</p>
                <p>{order.payerInfo.aclaration}</p>
                <p>{order.payerInfo.id}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="w-full flex justify-start ">
          <div className="w-full lg:w-3/5">
            <hr className="border-[1.5px] border-[#e279c84d]" />
          </div>
        </div>

        <div className="w-full space-y-4">
          <p className="font-bold text-2xl uppercase">Opciones de Entrega</p>
          <span className="text-sm">(Debe seleccionar una opción de Envío)</span>
          {order.payerInfo ? (
            <>
              {/* <div
                className={`${
                  shipping === "estandar"
                    ? "border-[3px] border-[#e46dc7] shadow-sm"
                    : "border-[1px] border-gray-700"
                } w-full lg:w-3/5 flex justify-between p-4 cursor-pointer hover:bg-gray-50`}
                onClick={() => handleClickShippingType("estandar")}
              >
                <div className="">
                  <div className="h-auto">
                    <h1 className="text-lg font-bold">Entrega Estándar </h1>
                    <h1 className="text-sm text-gray-600 text-left">
                      Retirar en punto de Correo Argentino mas cercano de su
                      domicilio (si alguno es de su preferencia porfavor
                      comunicarnos por whatsapp con su número de orden)
                    </h1>
                    <h1 className="text-md font-semibold text-gray-700 text-left">
                      3 a 4 días hábiles
                    </h1>
                  </div>
                </div>
                <div>Gratis</div>
              </div> */}
              <div
                className={`${
                  shipping === "estandar"
                    ? "border-[3px] border-[#e46dc7] shadow-sm"
                    : "border-[1px] border-gray-700"
                } w-full lg:w-3/5 flex justify-between p-4 cursor-pointer hover:bg-gray-50`}
                onClick={() => handleClickShippingType("estandar")}
                //   onClick={() => handleClickShippingType("Domicilio")}
              >
                <div className="">
                  <div className="h-auto">
                    <h1 className="text-lg font-bold">Envío a Domicilio</h1>
                    <h1 className="text-lg  text-gray-600 ">
                      {order.payerInfo.zipCode}, AR {order.payerInfo.street}{" "}
                      {order.payerInfo.streetNumber}
                    </h1>
                    <h1 className="text-md font-semibold text-gray-700 text-left">
                      5 días hábiles
                    </h1>
                  </div>
                </div>
                <div>Gratis</div>
              </div>
            </>
          ) : (
            ""
          )}
          {shipping ? (
            <div className="">
              <button
                className="w-auto h-10 px-4 uppercase bg-primeColor text-white text-lg mt-4 rounded-sm hover:bg-pink-600 duration-300"
                onClick={() => setReadyToPay(true)}
              >
                Continuar
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex justify-start ">
          <div className="w-full lg:w-3/5">
            <hr className="border-[1.5px] border-[#e279c84d]" />
          </div>
        </div>

        <div className="w-full space-y-4">
          <p className="font-bold text-2xl uppercase">Medio de Pago</p>
          {readyToPay ? (
            <>
              <div
                className={`${
                  paymentMethod === "tb"
                    ? "border-[3px] border-[#e46dc7] shadow-sm"
                    : "border-[1px] border-gray-700"
                } w-full lg:w-3/5 flex flex-wrap  p-4 cursor-pointer hover:bg-gray-50`}
                onClick={() => setPaymentMethod("tb")}
              >
                <div className="w-full flex justify-between">
                  <div className="">
                    <div className="h-8">
                      <h1 className="text-lg">Transferencia Bancaria</h1>
                    </div>
                  </div>
                  <div className="font-semibold">15% de descuento</div>
                </div>
                {paymentMethod === "tb" ? (
                  <div className="py-3 text-left text-md text-gray-500">
                    Cuando termines la compra, vas a ver la información de pago.
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                className={`${
                  paymentMethod === "mp"
                    ? "border-[3px] border-[#e46dc7] shadow-sm"
                    : "border-[1px] border-gray-700"
                } w-full lg:w-3/5 flex flex-wrap p-4 cursor-pointer hover:bg-gray-50`}
                onClick={() => setPaymentMethod("mp")}
              >
                <div className="w-full flex justify-between">
                  <div className="">
                    <div className="h-8">
                      <img
                        className="h-8 w-auto"
                        src="https://www.mercadopago.com/v1/platforms/tienda-nube/assets/logos/logo-mp-400x120.png"
                      />
                    </div>
                  </div>
                  <div className="font-semibold">Hasta 12 cuotas</div>
                </div>
                {paymentMethod === "mp" ? (
                  <div className="flex flex-wrap py-3 gap-2">
                    {tarjetas?.map((tarjeta) => (
                      <img className="w-14" src={tarjeta} />
                    ))}
                    {otherPaymentMethods?.map((payment) => (
                      <img src={payment} className="w-14" />
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            ""
          )}
          <div className="">
            {readyToPay ? (
              <button
                className={`w-auto h-auto px-4  py-2 uppercase bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300 ${
                  !paymentMethod ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={paymentMethod ? handlePay : null}
                disabled={!paymentMethod}
              >
                {processing === true
                  ? "..."
                  : paymentMethod === "mp"
                  ? "Pagar a través de Mercado Pago"
                  : paymentMethod === "tb"
                  ? "Realizar pedido con Transferencia"
                  : "Seleccione una forma de pago"}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="hidden relative  lg:flex w-full lg:w-1/3 border-2 border-gray-300 p-4 gap-4">
        <div className="sticky top-0 border-gray-700 w-full flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-left">
            Resumen Del Pedido
          </h1>
          <div className="w-full gap-y-4">
            {products?.map((product) => (
              <div className="flex justify-between gap-6">
                <div className="w-24 ">
                  <img className="w-full" src={product.image} />
                </div>
                <div className="w-full text-gray-800">
                  <p>
                    {product.name} {product.variant.variant}
                    <span>
                      ({product.size}) x{product.quantity}
                    </span>
                  </p>
                  <p>${product.price} c/u</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="flex items-center justify-between border-b-0 py-1.5 text-lg font-medium">
              Subtotal
              <span className="font-semibold tracking-wide font-titleFont">
                ${formatPrice(totalAmt)}
              </span>
            </p>
            <p className="flex items-center justify-between py-1.5 text-lg font-medium">
              Costo de envío
              <span className="font-semibold tracking-wide font-titleFont">
                {shipping === "estandar"
                  ? "Gratis"
                  : shippmentCharge === 0
                  ? "Gratis"
                  : `$${formatPrice(shippmentCharge)}`}
              </span>
            </p>
            {paymentMethod === "tb" && transferDiscount !== 0 ? (
              <p className="flex items-center justify-between border-b-0 py-1.5 text-lg font-medium">
                Descuento
                <span className="font-semibold tracking-wide font-titleFont">
                  -${formatPrice(transferDiscount)}
                </span>
              </p>
            ) : (
              ""
            )}
            <p className="flex items-center justify-between text-pink-600  py-1.5 text-xl font-bold">
              Total
              <span className="font-bold tracking-wide text-xl font-titleFont">
                ${formatPrice(shipmentPlusTotal)}
              </span>
            </p>
            <div className="my-4">
                <p className="text-lg font-semibold">Cupón de Descuento</p>
                <div className="flex gap-2 items-center mt-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Ingresa tu código"
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-primeColor text-white px-4 py-2 rounded hover:bg-pink-600 duration-300"
                  >
                    Aplicar
                  </button>
                </div>
                {couponValid && couponDiscount > 0 && couponSent && (
                  <p className="text-green-600 mt-2">
                    Cupón aplicado: {couponDiscount}% de descuento
                  </p>
                )}
                {!couponValid && couponCode !== "" && couponSent && (
                  <p className="text-red-600 mt-2">Cupón no válido</p>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
