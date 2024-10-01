import React from "react";
import FilterSizes from "../../Sizes/FilterSizes";
import { useDispatch } from "react-redux";
import {
  toggleCategory,
  toggleBrand,
  cleanFilters,
  toggleSubcategory,
} from "../../../redux/orebiSlice";
import { useNavigate } from "react-router-dom";

const DropdownBotines = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = {
    _id: 9009,
    title: "Camisetas",
  };

  const subcategory = [
    {
      _id: 10008,
      title: "24/25",
    },
    {
      _id: 10009,
      title: "Retro",
    },
  ];

  const sizes = [
    {
      _id: 9014,
      title: "S",
    },
    {
      _id: 9015,
      title: "M",
    },
    {
      _id: 9016,
      title: "L",
    },
    {
      _id: 9017,
      title: "XL",
    },
    {
      _id: 9018,
      title: "XXL",
    },
  ];

  const brands = [
    {
      _id: 900,
      title: "Nike",
    },
    {
      _id: 901,
      title: "Adidas",
    },
    {
      _id: 902,
      title: "Puma",
    },
  ];

  const handleFilterSub = (cat, sub) => {
    dispatch(cleanFilters());
    dispatch(toggleCategory(cat));
    if (sub) {
      dispatch(toggleSubcategory(sub));
    }
    navigate(`/catalogo`)
  };
  const handleFilter = (cat, brand) => {
    dispatch(cleanFilters());
    dispatch(toggleCategory(cat));
    if (brand) {
      dispatch(toggleBrand(brand));
    }
    navigate(`/catalogo`)
  };
  return (
    <div className=" w-full flex  h-auto p-10">
      <div className="border-[1px] flex w-full border-gray-100 space-x-4">
        <div className="w-[25%] flex flex-col justify-start">
          <h1 className="font-bold text-lg">Marca</h1>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category)}
          >
            Todas las camisetas
          </button>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category, brands[1])}
          >
            Camiseta Adidas
          </button>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category, brands[0])}
          >
            Camiseta Nike
          </button>
        </div>
        <div className="w-[25%] flex flex-col">
          <h1 className="font-bold text-lg"> Para</h1>
          <button className="text-left hover:underline"  
           onClick={() => handleFilterSub(category, subcategory[1])}
          >
            Camisetas Retro
          </button>
          <button className="text-left hover:underline"  
           onClick={() => handleFilterSub(category, subcategory[0])}
          >
            Camisetas 24/25
          </button>
        </div>
        <div className=" w-[50%] space-y-1">
          <h1 className="font-bold text-lg"> Busca según tu talle</h1>
          <FilterSizes sizes={sizes} cat={category} />
        </div>
      </div>
    </div>
  );
};

export default DropdownBotines;
