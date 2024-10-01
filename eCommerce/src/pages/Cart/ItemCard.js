import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";
import formatPrice from "../../utils/formatPrice";
const ItemCard = ({ item }) => {

  const dispatch = useDispatch();
  return (
    <div className="w-full mb-4 border ">
      <div className="flex justify-between col-span-3 gap-4">
        <div className="flex gap-4">
          <img
            className="w-auto h-[120px] lg:h-[200px] object-cover"
            src={item.image}
            alt="productImage"
          />
          <div className="py-4">
            <div className="flex items-start ">
              <h1 className="font-light uppercase text-md lg:text-lg">
                {item.name}
              </h1>
            </div>
            <div className="flex items-start ">
              <h1 className="font-light uppercase text-lg">
                {item.variant.variant}
              </h1>
            </div>
            <div className="flex-col items-center text-left justify-start lg:justify-start  gap-y-6 mdl:gap-0">
              <div className="flex w-1/3 items-center text-lg font-bold">
                ${formatPrice(item.quantity * item.price)}
              </div>
              <div className="flex w-2/3 items-center justify-start text-md font-normal">
                Talle {item.size}
              </div>
              <div className="w- border-gray-500 flex items-center justify-start gap-4 text-lg my-4">
                <span
                  onClick={() => dispatch(drecreaseQuantity({ id: item.id }))}
                  className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                >
                  -
                </span>
                <p>{item.quantity}</p>
                <span
                  onClick={() => {
                    if (item.quantity < item.maxQuantity) {
                      dispatch(increaseQuantity({ id: item.id }));
                    }
                  }}
                  className={`w-6 h-6  bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300  duration-300 border-[1px] border-gray-300 hover:border-gray-300 ${
                    item.quantity >= item.maxQuantity
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {item.quantity >= item.maxQuantity ? "x" : "+"}
                </span>
              </div>

              {/* <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
              <p>${item.quantity * item.price}</p>
            </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-start py-4 px-4">
          <RxCross2
            onClick={() =>
              dispatch(deleteItem({ id: item.id, size: item.size }))
            }
            className="text-primeColor text-xl hover:text-gray-500 duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
