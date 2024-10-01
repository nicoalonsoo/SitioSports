import React from "react";
import {
  follow_order,
  credit_card,
  sizes_guia,
  returning,
  shipping_order,
} from "../../assets/images";
import Contact from "../Contact/Contact";
const Help = () => {
  return (
    <div className="flex flex-wrap justify-center px-2 lg:px-32 py-12">
      <div className="flex flex-col justify-center px-0 lg:px-32 w-full">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
          <a href="/envios" className="w-1/3 lg:w-1/4 flex flex-col justify-center items-start bg-[#fc148c] rounded-lg hover:scale-110 duration-300">
          <div className="py-2">
              <img 
              className=""
              src={shipping_order} />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="text-center text-lg lg:text-2xl font-semibold text-white">
                Envios
              </h1>
            </div>
          </a>
          <a href="/metodos-de-pago" className="w-1/3 lg:w-1/4 flex flex-col justify-center items-start bg-[#fc148c] rounded-lg hover:scale-110 duration-300">
          <div className="py-2">
              <img src={credit_card} />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="text-center text-lg lg:text-2xl font-semibold text-white">
                Pagos
              </h1>
            </div>
          </a>
          <a href="/seguimiento-de-ordenes" className="w-1/3 lg:w-1/4 flex flex-col justify-center items-start bg-[#fc148c] rounded-lg hover:scale-110 duration-300">
          <div className="py-2">
              <img src={follow_order} />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="text-center text-lg lg:text-2xl font-semibold text-white">
                Seguimiento
              </h1>
            </div>
          </a>
          <a href="/devoluciones" className="w-1/3 lg:w-1/4 flex flex-col justify-center items-start bg-[#fc148c] rounded-lg hover:scale-110 duration-300">
          <div className="py-2">
              <img src={returning} />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="text-center text-lg lg:text-2xl font-semibold text-white">
                Devoluciones
              </h1>
            </div>
          </a>
          <a href="/guia-de-talles" className="w-1/3 lg:w-1/4 flex flex-col justify-center items-start bg-[#fc148c] rounded-lg p-3 hover:scale-110 duration-300">
            <div className="py-2">
              <img src={sizes_guia} />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="text-center text-lg lg:text-2xl font-semibold text-white">
                Talles
              </h1>
            </div>
          </a>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default Help;
