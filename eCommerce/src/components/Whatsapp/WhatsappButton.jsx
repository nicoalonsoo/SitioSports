import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {

  return (
    <a href="https://wa.me/+5493812097082" target="_blank">
      <button
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 rounded-full h-32 w-32 flex justify-center items-center text-white z-10 duration-300"
        style={{ height: "50px", width: "50px" }}
        // onClick={handleWhatsapp}
      >
        <FaWhatsapp size={35} />
      </button>
    </a>
  );
};

export default WhatsAppButton;
