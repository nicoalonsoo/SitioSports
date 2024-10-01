import React, { useState, useEffect } from "react";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import formatPrice from "../../../utils/formatPrice";

const Product = (props) => {
  const rootId = props.slug;
  const [variantNumber, setVariantNumber] = useState("")

  useEffect(() => {
    if(props.variants){
      setVariantNumber(props.variants.length)
    }
  
  }, [props]);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/producto/${rootId}`, {
      state: {
        item: productItem,
        discountedPrice: discountedPrice,
      },
    });
  };
  const calculateDiscountedPrice = () => {
    const discountedPrice = props.price * (1 - props.discount / 100);
    return discountedPrice.toFixed(2);
  };

  const discountedPrice = calculateDiscountedPrice();

  const { compare_price, price } = props;

  // Calcular el porcentaje de descuento
  const discountPercentage =
    compare_price && parseFloat(compare_price) !== 0.0
      ? Math.round(
          ((parseFloat(compare_price) - parseFloat(price)) /
            parseFloat(compare_price)) *
            100
        )
      : 0;

  // Convertir el porcentaje de descuento a cadena si es mayor que 0
  const discountText = discountPercentage > 0 ? `${discountPercentage}%` : "";

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden cursor-pointer">
        <div onClick={handleProductDetails}>
          <Image className="w-full h-full" imgSrc={props.img} />
        </div>
        <div className="absolute top-4 left-4">
          {discountPercentage !== 0 ? <Badge text={`${discountText}`} /> : null}
        </div>
        <div className="absolute bottom-4 right-4 bg-pink-600 text-xs text-gray-100 px-2 rounded-full shadow-lg">
         {variantNumber === 1 ? "1 Variante" : `${variantNumber} Variantes`}
        </div>
        <div className="w-full h-auto absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Ver Detalles
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-2 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-700">{props.productName}</h2>
        </div>
        <div className="flex gap-x-2 items-center">
          <p className="text-[#767676] font-bold text-[14px]">
            ${formatPrice(props.price)}
          </p>
          {props.compare_price && parseFloat(props.compare_price) !== 0.0 ? (
            <p className="text-[#767676] line-through text-[14px]">
              ${formatPrice(props.compare_price)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Product;
