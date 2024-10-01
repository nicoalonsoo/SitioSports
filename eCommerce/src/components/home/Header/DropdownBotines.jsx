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
  const sizes = [
    {
      _id: 9001,
      title: "39",
    },
    {
      _id: 9003,
      title: "40",
    },
    {
      _id: 9005,
      title: "41",
    },
    {
      _id: 9007,
      title: "42",
    },
    {
      _id: 9009,
      title: "43",
    },
    {
      _id: 9011,
      title: "44",
    },
    {
      _id: 90013,
      title: "45",
    },
  ];
  const subcategory = [
    {
      _id: 10006,
      title: "Futbol 5",
    },
    {
      _id: 10007,
      title: "Futbol 11",
    },
  ];
  const category = {
    _id: 9006,
    title: "Botines",
  };

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
        <div className="w-[25%] flex flex-col">
          <h1 className="font-bold text-lg">Marca</h1>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category)}
          >
            Todos los Botines
          </button>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category, brands[1])}
          >
            Botines Adidas
          </button>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category, brands[0])}
          >
            Botines Nike
          </button>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category, brands[2])}
          >
            Botines Puma
          </button>
        </div>
        <div className="w-[25%] flex flex-col">
          <h1 className="font-bold text-lg"> Para</h1>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilterSub(category, subcategory[0])}
          >
            Calzado de Futbol 5
          </button>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilterSub(category, subcategory[1])}
          >
            Calzado de Futbol 11
          </button>
        </div>
        <div className=" w-[50%] space-y-1">
          <h1 className="font-bold text-lg"> Busca según tu talle</h1>
          <FilterSizes sizes={sizes} cat={category}/>
        </div>
      </div>
    </div>
  );
};

export default DropdownBotines;
