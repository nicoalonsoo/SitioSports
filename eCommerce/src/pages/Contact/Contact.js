import React from "react";
import contactImg from "../../assets/images/sitio/contacto.jpeg";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
const Contact = () => {
  return (
    <div className="max-w-container mx-auto px-32 py-14 space-y-8">
      <h1 className="text-gray-700 font-bold text-4xl">SERVICIO AL CLIENTE</h1>
      <p>Servicio disponible de Lun - Vie: 9:00 AM a 9:00 PM y Sab: 10:00 AM a 6:00 PM</p>
      <div className="flex flex-wrap lg:flex-nowrap items-start gap-4">
        <div className="w-full lg:w-auto">
          <a href="https://wa.me/+5493812097082" target="_blank"><FaWhatsapp className="text-8xl" /></a>
        </div>
        <div className="space-y-4 text-left w-full lg:w-2/3">
          <h1 className="text-gray-700 font-bold text-xl">Whatsapp</h1>
          <p className="text-lg">
            Añade +54 9 3812 09‑7082 a la lista de contactos en tu smartphone y
            comunícate con nosotros.
          </p>
          <p className="text-lg">
            Si necesitas ayuda a través de WhatsApp, por favor comunícate con
            nosotros al número +54 9 3812 09‑7082. Recuerda que adidas nunca iniciará
            la comunicación ni te buscará por este canal, solamente
            responderemos a tus mensajes.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4 py-8">
        <div>
          <a  href="mailto:sitiosports.contacto@gmail.com"
                target="_blank"> <IoMdMail className="text-8xl" /></a>
        </div>
        <div className="space-y-4 text-left ">
          <h1 className="text-gray-700 font-bold text-xl">Correo Electrónico</h1>
          <p className="text-lg">
          sitiosports.contacto@gmail.com
          </p>
       
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div>
          <a href="https://www.instagram.com/sitiosports.ar/"  target="_blank"> <FaInstagram className="text-8xl" /></a>
        </div>
        <div className="space-y-4 text-left ">
          <h1 className="text-gray-700 font-bold text-xl">Instagram</h1>
          <p className="text-lg">
            Comunicate con nosotros a travez de nuestro instagram. 
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Contact;
