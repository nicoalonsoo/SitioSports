import React from "react";

const OrdersFollows = () => {
  return (
    <div className="px-2 lg:px-20 flex justify-center">
      <div className="flex flex-col justify-center items-start py-20 w-full lg:w-2/3 gap-6">
        <h1 className="text-3xl font-semibold">Seguimiento de pedidos</h1>
        <div className="flex flex-col justify-start items-start space-y-6">
          <p className="text-xl">
            Nuestros enviós son realizados con el servicio de Correo Argentino.
          </p>
          <img
            src="https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/shipping/api/2682@2x.png"
            alt="correo argentino"
          />
          <p>
            Una vez que tu pedido haya sido despachado vamos a contactarte por
            mail para mandarte tu codigo de seguimiento, y asi entrando en esta
            pagina&nbsp;
             <a className="underline text-pink-600" target="_blank" href="https://www.correoargentino.com.ar/formularios/e-commerce">Seguimiento Correo Argentino</a>
             &nbsp;puedas tener el seguimiento de tu compra!
          </p>

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

export default OrdersFollows;
