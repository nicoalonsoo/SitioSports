import React from "react";
import { tarjetas, otherPaymentMethods } from "../../constants";
const Payments = () => {
  return (
    <div className="px-2 lg:px-20 flex justify-center">
      <div className="flex flex-col justify-center items-start py-20 w-full lg:w-2/3 gap-6">
        <h1 className="text-3xl font-semibold">Métodos de Pago</h1>
        <div className="flex flex-col justify-start items-start space-y-6">
          <p className="text-xl">Ofrecemos dos formas de págo:</p>
          <div className="space-y-2">
            <h1 className="text-pink-600 text-xl font-semibold">
              Mercado Pago
            </h1>
            <p>
              A través de la pasarela de pago de Mercado Pago brindamos a
              nuestros clientes la posibilidad de abonar con:{" "}
            </p>
            <p>Tarjeta de crédito</p>
            <p>Tarjeta de débito</p>
            <p>Efectivo (Pago Facil o Rapipago)</p>
            <p>Tu dinero de Mercado Pago</p>
            <div className="flex flex-wrap py-3 gap-2">
              {tarjetas?.map((tarjeta) => (
                <img className="w-14" src={tarjeta} />
              ))}
              {otherPaymentMethods?.map((payment) => (
                <img src={payment} className="w-14" />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-pink-600 text-xl font-semibold">
              Transferencia Bancaria
            </h1>
            <p>
              {" "}
              Ofrecemos un 15% de descuento a quienes optan por abonar con
              transferencia bancaria, un vez que terminan su orden les brindamos
              la informacion detallada para poder transferir el monto de su
              orden.{" "}
            </p>
          </div>

          <p>
            Por favor cualquier consulta puedes comunicarnos a nuestro whatsapp
            o por correo electrónico. También le pedimos amablemente que nos
            indique el número de orden de su compra.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payments;
