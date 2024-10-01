import React from "react";

const Shipping = () => {
  return (
    <div className="px-2 lg:px-20 flex justify-center">
      <div className="flex flex-col justify-center items-start py-20 w-full lg:w-2/3 gap-6">
        <h1 className="text-3xl font-semibold">Envíos</h1>
        <div className="flex flex-col justify-start items-start space-y-6">
          <p className="text-xl">
            Nuestros envíos son realizados con el servicio de Correo Argentino.
          </p>
          <img
            src="https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/shipping/api/2682@2x.png"
            alt="correo argentino"
          />
          <p className="text-xl">Ofrecemos dos formas de envíos:</p>
          <div className="space-y-2">
            <h1 className="text-pink-600 text-xl font-semibold">
              A sucursal - Gratis 3-4 días hábiles.
            </h1>
            <p>
              Tu pedido es despachado y enviado a la sucursal de Correo
              Argentino más cercana a tu domicilio, tardando de 3 a 4 días
              hábiles.
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-pink-600 text-xl font-semibold">
              A domicilio - Gratis 5-6 días hábiles.
            </h1>
            <p>
              Tu pedido es despachado y enviado a tu domicilio, tardando de 5 a 6 días hábiles en llegar.
            </p>
          </div>
          <p>
            Para todos los envíos proporcionamos al cliente un código de
            seguimiento para poder rastrear su pedido a través de Correo
            Argentino.
          </p>
          <p>
            Por favor, cualquier consulta puedes comunicarte a nuestro WhatsApp ( <a href="https://wa.me/+5493812097082" target="_blank" className="text-pink-500 hover:underline">+54 9 3812 09‑7082</a>)
            o por correo electrónico. También le pedimos amablemente que nos
            indique el número de orden de su compra.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
