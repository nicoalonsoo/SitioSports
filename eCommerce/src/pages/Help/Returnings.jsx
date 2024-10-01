import React from "react";

const Returnings = () => {
  return (
    <div className="px-2 lg:px-20 flex justify-center">
      <div className="flex flex-col justify-center items-start py-20 w-full lg:w-2/3 gap-6">
        <h1 className="text-3xl font-semibold">Política de Devolución y Garantía</h1>
        <div className="flex flex-col justify-start items-start space-y-6">
          <p className="text-xl">
            En Sitio Sports, nos comprometemos a brindarle a nuestros clientes la mejor experiencia de compra posible. Por eso, ofrecemos una política de devolución y garantía justa y clara.
          </p>
          
          <h2 className="text-2xl font-semibold">Garantía de 4 Semanas:</h2>
          <ul className="list-disc pl-5 mt-4">
            <li>Todos los productos adquiridos en Sitio Sports tienen una garantía de 4 semanas a partir de la fecha de compra.</li>
            <li>Si el producto presenta algún defecto o problema durante este período, se puede cambiar por otro producto idéntico.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold">Condiciones para la Devolución:</h2>
          <ul className="list-disc pl-5 mt-4">
            <li>El producto debe estar en las mismas y perfectas condiciones en que se entregó.</li>
            <li>Debe incluir todos los accesorios y embalajes originales.</li>
            <li>No debe presentar signos de uso o desgaste.</li>
            <li>Debe estar acompañado de la factura o comprobante de compra original.</li>
          </ul>

          <h2 className="text-2xl font-semibold">Procedimiento de Devolución:</h2>
          <ol className="list-decimal pl-5 mt-4">
            <li>El cliente debe notificar a Sitio Sports sobre su intención de devolver el producto dentro de las 4 semanas posteriores a la compra.</li>
            <li>El cliente debe enviar el producto de vuelta a Sitio Sports en las mismas condiciones en que se recibió.</li>
            <li>Sitio Sports verificará el estado del producto y, si cumple con las condiciones, procederá a cambiarlo por otro producto idéntico.</li>
          </ol>

          <h2 className="text-2xl font-semibold">Excepciones:</h2>
          <ul className="list-disc pl-5 mt-4">
            <li>No se aceptarán devoluciones de productos que hayan sido personalizados o modificados de acuerdo a las especificaciones del cliente.</li>
            <li>No se aceptarán devoluciones de productos que hayan sido adquiridos con un descuento o promoción especial.</li>
          </ul>

          <p className="text-xl">
            Si tiene alguna pregunta o inquietud sobre nuestra política de devolución y garantía, por favor no dude en contactarnos. Estamos aquí para ayudarle.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Returnings;
