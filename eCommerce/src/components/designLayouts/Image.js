import React from "react";
import compressImage from "../../utils/compressImage";
const Image = ({ imgSrc, className }) => {
  return <img className={className} src={compressImage(imgSrc)} alt={imgSrc} />;
};

export default Image;
