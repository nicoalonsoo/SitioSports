import React, { useState } from "react";
import Slider from "react-slick";
import CustomSlide from "./CustomSlide";
import { banner1, banner2, banner3 } from "../../assets/images";

import { cleanFilters, toggleBrand, toggleCategory } from "../../redux/orebiSlice";
import { useDispatch } from "react-redux";
import { allCategories, allBrands } from "../../constants";
import { cybermonday, cybermonday2, cybermonday3 } from "../../assets/images";

const Banner = () => {
  const dispatch = useDispatch(); 
  const [dotActive, setDotActive] = useState(0);
 
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 9000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
  };

  const slides = [
    {
      imgSrc:
        banner2,
      text: "Quality Printing Solutions",
      Subtext:
        "Discover our wide range of printers and consumables designed for professional printing needs.",
      buttonLink: "/catalogo",
      buttonText: "Comprar Ahora",
      buttonClick: () => {
        dispatch(cleanFilters());
        dispatch(toggleCategory(allCategories[0]));
        dispatch(toggleBrand(allBrands[1]));
      },
    },
    {
      imgSrc:
      banner1,
      text: "Quality Printing Solutions",
      Subtext:
        "Discover our wide range of printers and consumables designed for professional printing needs.",
      buttonLink: "/catalogo",
      buttonText: "Comprar Ahora",
      buttonClick: () => {
        dispatch(cleanFilters());
        dispatch(toggleCategory(allCategories[1]));
        dispatch(toggleBrand(allBrands[1]));
      },
    },
    {
      imgSrc: banner3,
      text: "Enhance Your Printing Experience",
      Subtext:
        "Explore our premium printers and consumables for exceptional results",
      buttonLink: "/catalogo",
      buttonText: "Comprar Ahora",
      buttonClick: () => {
        dispatch(cleanFilters());
        dispatch(toggleCategory(allCategories[0]));
        dispatch(toggleBrand(allBrands[0]));
      },
    },
  ];

  
  return (
    <div className="w-full bg-white overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
