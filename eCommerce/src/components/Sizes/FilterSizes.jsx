import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleSizes,
  toggleCategory,
  cleanFilters,
} from "../../redux/orebiSlice";
import { useNavigate } from "react-router-dom";

const FilterSizes = ({ sizes, cat }) => {
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();

  const handleFilter = () => {
    dispatch(cleanFilters());
    dispatch(toggleCategory(cat));
    dispatch(toggleSizes(selectedSize));
    navigate("/catalogo")
  };
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };
  const groupedSizes = [];
  for (let i = 0; i < sizes.length; i += 5) {
    groupedSizes.push(sizes.slice(i, i + 5));
  }
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-5">
        {groupedSizes.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((size) => (
              <div
                key={size._id}
                className={`cursor-pointer border w-auto flex justify-center border-gray-300  overflow-hidden ${
                  selectedSize === size ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => handleSizeSelection(size)}
              >
                <div className="p-1 px-2 ">{size.title}</div>
              </div>
            ))}
          </React.Fragment>
        ))}
          <button href={selectedSize ? `/catalogo` : ""}
          className={`cursor-pointer border w-auto flex justify-center border-gray-300 bg-black text-white overflow-hidden`}
        onClick={selectedSize ? handleFilter : ""}
        >
          <div className="p-1 px-2 ">Buscar</div>
        </button> 
      </div>
    </div>
  );
};

export default FilterSizes;
