import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { GoTriangleDown } from "react-icons/go";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { logoTransparent } from "../../../assets/images";
import Category from "../shopPage/shopBy/Category";
import Subcategory from "./shopBy/SubCategories/Subcategory";
import Size from "../shopPage/shopBy/Size";
import SizeCamisetas from "../shopPage/shopBy/SizeCamisetas";
import SubcategoryCamisetas from "../shopPage/shopBy/SubCategories/SubcategoryCamisetas";
import SubcategoryZapatillas from "./shopBy/SubCategories/SubcategoryZapatillas";
import SubcategoryAccesorios from "./shopBy/SubCategories/SubcategoryAccesorios";
import SubcategoryIndumentaria from "./shopBy/SubCategories/SubcategoryIndumentaria";
import SizeMedias from "../shopPage/shopBy/SizeMedias";
import Brand from "../shopPage/shopBy/Brand";
import { useSelector, useDispatch } from "react-redux";
import { cleanFilters } from "../../../redux/orebiSlice";
const ProductBanner = ({ itemsPerPageFromBanner, handleSort }) => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState("");

  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const selectedSubcategories = useSelector(
    (state) => state.orebiReducer.checkedSubcategorys
  );
  const selectedSizes = useSelector((state) => state.orebiReducer.checkedSizes);
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    handleSort(value);
  };

  const handleClick = () => {
    setShowFilters(!showFilters);
  };
  const handleCleanFilters = () => {
    dispatch(cleanFilters());
  };
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-end">
      <div className="flex justify-between lg:justify-center items-center px-4 gap-2 md:gap-6 mt-4 md:mt-0">
        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label className="block">Ordenar Por:</label>
          <select
            onChange={handleChange}
            id="countries"
            className="w-32 md:w-[225px] border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="price_asc">Precio (Menor a Mayor)</option>
            <option value="novedades">Novedades</option>
            <option value="popular">Mas Vendido</option>
            <option value="price_desc">Precio (Mayor a Menor)</option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
        <div className="block lg:hidden">
          <button onClick={handleClick}>
            <FiFilter className="text-3xl text-[#fc148c]" />
          </button>
        </div>
        {showFilters && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[80%] h-full relative"
            >
              <div className="w-full h-full bg-primeColor p-6">
                <div>
                  <h1 className="text-2xl">Filtrar por:</h1>
                  <button
                    className="bg-[#fc148c] px-2 py-2 rounded-lg my-2"
                    onClick={handleCleanFilters}
                  >
                    Borrar todo
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  <Category icons={false} />
                  {selectedCategories.length &&
                  selectedCategories[0].title === "Botines" ? (
                    <Size />
                  ) : selectedCategories.length &&
                    selectedCategories[0].title === "Camisetas" ? (
                    <SizeCamisetas />
                  ) : selectedCategories.length &&
                    selectedCategories[0].title === "Medias" ? (
                    <SizeMedias />
                  ) : (
                    ""
                  )}
                  <Brand />
                  {selectedCategories.length &&
                  selectedCategories[0].title === "Botines" ? (
                    <Subcategory />
                  ) : selectedCategories.length &&
                    selectedCategories[0].title === "Camisetas" ? (
                    <SubcategoryCamisetas />
                  ) : selectedCategories.length &&
                    selectedCategories[0].title === "Zapatillas" ? (
                    <SubcategoryZapatillas />
                  ) : selectedCategories.length &&
                    selectedCategories[0].title === "Indumentaria" ? (
                    <SubcategoryIndumentaria />
                  ) : selectedCategories.length &&
                    selectedCategories[0].title === "Accesorios" ? (
                    <SubcategoryAccesorios />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <span
                onClick={handleClick}
                className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
              >
                <MdClose />
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductBanner;
