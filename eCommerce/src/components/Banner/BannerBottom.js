import React from "react";
import { lock, shipping_country } from "../../assets/images";
import { FaWhatsapp } from "react-icons/fa";
import Slider from "react-slick";
const BannerBottom = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white border-b-[1px] border-b-gray-200 px-2 lg:px-32 pt-3 lg:pt-4 pb-8 lg:py-10">
      <div className="blocl lg:hidden">
        <Slider {...settings} className="w-full">
          <div>
            <div className="flex flex-col w-full  justify-center items-start text-center">
              <div className="flex justify-center w-full h-1/3 items-start text-orange-500">
                <img src={shipping_country} className="w-[10%]" />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <p className="text-md text-center text-lightText ">
                  ENVÍO GRATIS <br />{" "}
                </p>
                <span className="text-xs text-center text-lightText ">
                  A PARTIR DE $45.000
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col w-full justify-center items-start text-center">
              <div className="flex justify-center w-full h-1/3 items-center text-orange-500">
                <FaWhatsapp className="text-[#fc148c] text-4xl" />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <p className="text-md w-full text-center text-lightText uppercase">
                  24 hs de atención al cliente
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col w-full  justify-center items-start text-center">
              <div className="flex justify-center w-full h-1/3 items-start text-orange-500">
                <img src={lock} className="w-[10%]" />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <p className="text-md text-center text-lightText uppercase">
                  Compra protegida
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <div className="hidden max-w-container mx-auto h-20 lg:flex flex-col md:flex-row justify-between items-center lg:px-24">
        <div className="flex md:w-auto items-center gap-2 w-72 space-x-4">
          <span className="text-5xl text-center w-10 ml-1 text-orange-500">
            <img src={shipping_country} />
          </span>
          <p className="text-lg text-lightText ">
            ENVÍO GRATIS <br />{" "}
            <span className="text-xs text-lightText ">
              ENVÍO GRATIS A PARTIR DE $45.000
            </span>
          </p>
        </div>

        <div className="h-2/3 border-l-2 border-[#e5e7eb]"></div>

        <a
          href="https://wa.me/+5490446339"
          target="_blank"
          className="flex items-center gap-2 w-72 space-x-4"
        >
          <span className="font-bold font-titleFont w-6 text-center">
            <FaWhatsapp className="text-[#fc148c]" size={35} />
          </span>
          <p className="text-lightText text-xl">24 Hs Atención al Cliente</p>
        </a>

        <div className="h-2/3 border-l-2 border-[#e5e7eb]"></div>

        <div className="flex  md:w-auto items-center gap-2 w-72 space-x-4">
          <span className="text-2xl  text-center w-10">
            <img src={lock} />
          </span>
          <p className="text-xl text-lightText">Compra Protegida</p>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
