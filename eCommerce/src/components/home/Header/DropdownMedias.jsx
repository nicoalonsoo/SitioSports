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

const DropdownMedias = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = {
    _id: 9008,
    title: "Medias",
  };


  const sizes = [
    {
      _id: 9019,
      title: "39/40",
    },
    {
      _id: 9020,
      title: "41/42",
    },
    {
      _id: 9021,
      title: "43/44",
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
        <div className="w-[25%] flex flex-col">
          <h1 className="font-bold text-lg">Marca</h1>
           <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category)}
          >
           Todas las medias
           </button>
           <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category, brands[1])}
          >
            Medias Adidas
           </button>
           <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category, brands[0])}
          >
            Medias Nike
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

export default DropdownMedias;
