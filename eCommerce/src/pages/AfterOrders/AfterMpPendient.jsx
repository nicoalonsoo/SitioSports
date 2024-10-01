import React from 'react'
import { useParams } from 'react-router-dom';
const AfterMpPendient = () => {
  const { orden } = useParams();
  return (
    <div className="px-4 lg:px-20 flex justify-center">
      <div className="flex justify-center items-start py-20 w-full lg:w-2/3 gap-6">
        <div className="flex flex-col justify-start items-start space-y-6">
          <h1 className="text-3xl font-normal">Orden de compra: #{orden}</h1>
          <h1 className="text-xl text-pink-600 font-semibold">Su pago esta pendiente.</h1>
          <p>Una vez se nos acredite su pago vamos a aprobar su orden y despacharla correctamente. Cualquier consulta sobre la acreditacion de su pago puede comunicarselo al equipo de Mercado Pago y asi obtener respuestas.</p>
          <a href='https://www.mercadopago.com.ar/ayuda' target="_blank" className='underline text-pink-600 hover:text-pink-900'>Mercado Pago Ayuda</a>
              <p>
                Ante cualquier duda puede contactarse con nosotros por Whatsapp al numero 3213322345 o a nuestro correo electronico sitiosports@gmail.com. Estamos a su disposicion
              </p>
        </div>
      </div>
    </div>
  );
}

export default AfterMpPendient
