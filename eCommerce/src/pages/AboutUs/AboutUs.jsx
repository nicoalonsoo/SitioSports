import React from "react";
import Contact from "../Contact/Contact";
import video from "../../assets/videos/sitiosports.mp4";

const AboutUs = () => {
  return (
    <div className="flex flex-wrap justify-center px-2 lg:px-32 py-12">
      <div className="flex flex-col lg:flex-row lg:space-x-8 lg:px-32">
        <div className="w-full lg:w-1/2">
          <h1 className="text-gray-700 font-bold text-4xl w-full text-left">
            SITIO SPORTS
          </h1>
          <p className="mt-4">
            <span className="font-bold text-pink-500">
              ¡Bienvenidos a Sitio Sports!
            </span>{" "}
            Somos una tienda de artículos deportivos especializados en botines
            de fútbol, fundada en junio de 2021 por dos primos apasionados por
            el deporte.
          </p>
          <p className="mt-4">
            <span className="font-bold text-pink-500">Nuestra misión</span> es
            brindar a los amantes del fútbol las mejores opciones para mejorar
            su juego, con productos de alta calidad y diseños innovadores. Nos
            enfocamos en ofrecer una amplia variedad de botines para todos los
            estilos y necesidades, desde los jugadores profesionales hasta los
            entusiastas del fin de semana.
          </p>
          <p className="mt-4">
            En Sitio Sports, creemos en la importancia de la pasión, la
            dedicación y el trabajo en equipo. Por eso, nos esforzamos por
            brindar un servicio personalizado y una experiencia de compra única
            para cada cliente.
          </p>
          <p className="mt-4 font-bold text-pink-500">
            ¡Visítanos y descubre por qué somos la mejor opción para tus
            necesidades de fútbol!
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <video
            src={video}
            loop
            autoPlay
            muted
            className="w-full lg:w-96 h-auto rounded-lg shadow-lg"
          ></video>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default AboutUs;
