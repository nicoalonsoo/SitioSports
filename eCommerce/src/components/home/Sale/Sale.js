import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { offer1, offer2, video_arg } from "../../../assets/images/index";
import Image from "../../designLayouts/Image";
import camiseta_offer from "../../../assets/images/camiseta_offer.webp";

import {
  cleanFilters,
  toggleBrand,
  toggleCategory,
} from "../../../redux/orebiSlice";
import { useDispatch } from "react-redux";
import { allCategories, allBrands } from "../../../constants";

const Sale = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null); // Usamos una referencia para el video
  const [isVideoVisible, setIsVideoVisible] = useState(false); // Estado para el estado visible del video

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cuando el video está visible, lo reproducimos
            setIsVideoVisible(true);
          } else {
            // Cuando el video no está visible, lo pausamos
            setIsVideoVisible(false);
          }
        });
      },
      {
        threshold: 0.5, // El 50% del video debe estar visible para que se considere dentro del viewport
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current); // Observamos el elemento del video
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current); // Dejamos de observar el video cuando el componente se desmonta
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoVisible) {
        videoRef.current.play(); // Reproducir el video si es visible
      } else {
        videoRef.current.pause(); // Pausar el video si no es visible
      }
    }
  }, [isVideoVisible]);

  return (
    <div className="py-0 lg:py-20 flex flex-col md:flex-row items-start justify-between gap-4">
      <div className="bg-[#f3f3f3] w-full md:w-2/3 lg:w-1/2 f-full flex flex-col justify-center items-center text-black">
        <Link
          to="/catalogo"
          onClick={() => {
            dispatch(cleanFilters());
            dispatch(toggleCategory(allCategories[1]));
            dispatch(toggleBrand(allBrands[1]));
          }}
          className="relative h-[610px] aspect-w-4 aspect-h-3 w-full"
        >
          <video
            ref={videoRef} // Referencia al video
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={video_arg} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </Link>
      </div>

      <div className="hidden h-[610px] w-full md:w-2/3 lg:w-1/2 lg:flex flex-col gap-4 overflow-hidden">
        <div className="h-1/2 w-full">
          <Link
            to="/catalogo"
            onClick={() => {
              dispatch(cleanFilters());
              dispatch(toggleCategory(allCategories[1]));
            }}
          >
            <Image
              className="h-full w-full object-cover"
              imgSrc={camiseta_offer}
            />
          </Link>
        </div>
        <div className="h-1/2 w-full">
          <Link
            to="/catalogo"
            onClick={() => {
              dispatch(cleanFilters());
              dispatch(toggleCategory(allCategories[0]));
            }}
          >
            <Image className="h-full w-full object-cover" imgSrc={offer2} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sale;
