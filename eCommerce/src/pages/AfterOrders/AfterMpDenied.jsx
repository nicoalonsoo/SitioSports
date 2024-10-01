import React from 'react'
import { useParams } from 'react-router-dom';
const AfterMpDenied = () => {
    const { orden } = useParams();
    return (
      <div className="px-4 lg:px-20 flex justify-center">
      <div className="flex justify-center items-start py-20 w-full lg:w-2/3 gap-6">
            <div className="flex flex-col justify-start items-start space-y-6">
            <h1 className="text-3xl font-normal">Orden de compra: #{orden}</h1>
          <h1 className="text-xl text-pink-600 font-semibold">Su pago fue denegado</h1>
              <p>Lamentablemente parece que Mercado Pago denegó su acreditación, por lo que le pedimos que se comunique con su equipo para solucionar este problema.</p>
              <a href='https://www.mercadopago.com.ar/ayuda' target="_blank" className='underline text-pink-600 hover:text-pink-900'>Mercado Pago Ayuda</a>
              <p>
                Por favor, si necesita realizar su compra le pedimos que vuelva a cargar los productos en su carrito y efectúe el pago con su medio de confianza. 
              </p>
            </div>
          </div>
        </div>
      );
}

export default AfterMpDenied
