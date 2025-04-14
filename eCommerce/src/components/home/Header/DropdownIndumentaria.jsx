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

const DropdownIndumentaria = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category =  {
    _id: 9005,
    title: "Indumentaria",
  };

  const subcategory = [
    {
      _id: 10012,
      title: "Campera",
    },
    {
      _id: 10013,
      title: "Buzo",
    },
    {
      _id: 10014,
      title: "Chaleco",
    },
    {
      _id: 10015,
      title: "Conjunto",
    },
    {
      _id: 10022,
      title: "Calzas",
    }
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
            Todos los productos de indumentaria
          </button>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category, brands[1])}
          >
            Marca Adidas
          </button>
          <button
            className="text-left hover:underline"
             
            onClick={() => handleFilter(category, brands[0])}
          >
            Marca Nike
          </button>
        </div>
        <div className="w-[25%] flex flex-col">
          <h1 className="font-bold text-lg"> Para</h1>
          <button className="text-left hover:underline"  
           onClick={() => handleFilterSub(category, subcategory[0])}
          >
            Camperas
          </button>
          <button className="text-left hover:underline"  
           onClick={() => handleFilterSub(category, subcategory[1])}
          >
            Buzos
          </button>
          <button className="text-left hover:underline"  
           onClick={() => handleFilterSub(category, subcategory[2])}
          >
            Chalecos
          </button>
          <button className="text-left hover:underline"  
           onClick={() => handleFilterSub(category, subcategory[3])}
          >
            Conjuntos
          </button>
          <button className="text-left hover:underline"  
           onClick={() => handleFilterSub(category, subcategory[4])}
          >
            Calzas
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

export default DropdownIndumentaria;
