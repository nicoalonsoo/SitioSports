import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import thumbnailConvert from "../../../utils/convertThumbnail";
import compressImage from "../../../utils/compressImage";

const CarruselDetail = ({ productInfo, variantImages }) => {
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImage] = useState("");

  useEffect(() => {
    if (productInfo && variantImages) {
      // Comprimiendo las imágenes antes de establecer el estado
      const compressedImages = variantImages.map((image) => compressImage(image));
      setImages(compressedImages);
      setActiveImage(compressedImages[0]);
    }
  }, [variantImages, productInfo]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {productInfo ? (
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <img
            src={activeImg}
            alt={activeImg}
            className="hidden lg:block w-full h-full object-cover rounded-xl"
          />
          <div className="h-24 hidden lg:flex justify-center">
            <div className="flex flex-row justify-center space-x-6 overflow-hidden">
              {images.map((image, index) => (
                <img
                  key={index} // Agrega key para evitar advertencias de React
                  src={image}
                  alt=""
                  className={`w-32 h-auto rounded-md cursor-pointer ${
                    activeImg === image ? "border-2 border-gray-500 shadow-md" : ""
                  }`}
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="block lg:hidden pt-0 pb-8 lg:py-8 w-[100%]">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="px-2">
                  <div className="w-auto flex flex-wrap justify-center items-start gap-4 rounded-xl overflow-hidden">
                    <img src={image} alt="img_before" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CarruselDetail;
