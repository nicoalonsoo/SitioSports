import React from "react";
import { bannerImgFour } from "../../assets/images";
import { Link } from "react-router-dom";
import Image from "../designLayouts/Image";
import { cleanFilters } from "../../redux/orebiSlice";
import { useDispatch } from "react-redux";
const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText, buttonClick }) => {
  const dispatch = useDispatch();
  return (
    <div className="relative flex justify-start items-start h-[200px] lg:h-[650px]">
      <div className="absolute">
        <Image imgSrc={imgSrc} />
      </div>
      <Link
      onClick={buttonClick}
        to={buttonLink}
        className="cursor-pointer rounded-sm absolute top-8 lg:top-20 left-4 lg:left-24 uppercase text-[10px] lg:text-xl p-2 lg:p-4 bg-gray-900 hover:bg-[#fc148c] duration-300 text-gray-50"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default CustomSlide;
