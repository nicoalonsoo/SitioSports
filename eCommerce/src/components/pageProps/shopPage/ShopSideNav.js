import React, { useState, useEffect } from "react";
import Brand from "./shopBy/Brand";
import Tags from "./shopBy/Tags";
import Category from "./shopBy/Category";
import Subcategory from "./shopBy/SubCategories/Subcategory";
import Size from "./shopBy/Size";
import SizeZapatillas from "./shopBy/SizeZapatillas";
import SizeCamisetas from "./shopBy/SizeCamisetas";
import SubcategoryCamisetas from "./shopBy/SubCategories/SubcategoryCamisetas";
import SubcategoryAccesorios from "./shopBy/SubCategories/SubcategoryAccesorios";
import SubcategoryIndumentaria from "./shopBy/SubCategories/SubcategoryIndumentaria";
import SubcategoryZapatillas from "./shopBy/SubCategories/SubcategoryZapatillas";
import SizeMedias from "./shopBy/SizeMedias";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleBrand,
  toggleCategory,
  toggleSizes,
  toggleSubcategory,
  toggleTags
} from "../../../redux/orebiSlice";
import {
  allBrands,
  allCategories,
  allSizes,
  allSubcategories,
  allTags
} from "../../../constants";
const ShopSideNav = () => {
  const dispatch = useDispatch();
  const [allActiveFilters, setAllActiveFilters] = useState([]);

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
  const selectedTags = useSelector((state) => state.orebiReducer.checkedTags);

  useEffect(() => {
    const combinedFilters = [
      ...selectedCategories,
      ...selectedSubcategories,
      ...selectedSizes,
      ...selectedBrands,
      ...selectedTags
    ];
    setAllActiveFilters(combinedFilters);
  }, [
    selectedCategories,
    selectedSubcategories,
    selectedSizes,
    selectedBrands, 
    selectedTags
  ]);

  const handleRemoveFilter = (filter) => {
    if (allBrands.some((brand) => brand.title === filter.title)) {
      dispatch(toggleBrand(filter));
    } else if (
      allCategories.some((category) => category.title === filter.title)
    ) {
      dispatch(toggleCategory(filter));
    } else if (
      allSubcategories.some((subcategory) => subcategory.title === filter.title)
    ) {
      dispatch(toggleSubcategory(filter));
    } else if (allSizes.some((size) => size.title === filter.title)) {
      dispatch(toggleSizes(filter));
    } else if (allTags.some((tag) => tag.title === filter.title)) {
      dispatch(toggleTags(filter));
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Filtros</h1>
      <div>
        <p className="font-semibold">Aplicado:</p>
        {allActiveFilters.length ? (
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {allActiveFilters?.map((filter) => (
              <div
                key={filter._id}
                className="flex justify-start items-center gap-1 w-auto h-auto relative font-semibold text-gray-700 py-1 px-3 bg-pink-300 border-[2px] border-pink-600 hover:text-pink-600 hover:border-gray-700 hover:bg-gray-400 cursor-pointer"
                onClick={() => handleRemoveFilter(filter)}
              >
                <p>{filter.title}</p>
                <button className="text-xl font-bold text-gray-700">x</button>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <Category icons={false} />

      {selectedCategories.length && selectedCategories[0].title === "Zapatillas" ? <Tags /> : ""}
      
      { selectedCategories.length && selectedCategories[0].title === "Botines" ? <Size /> 
       : selectedCategories.length && selectedCategories[0].title === "Camisetas" ? <SizeCamisetas /> : selectedCategories.length && selectedCategories[0].title === "Indumentaria" ?  <SizeCamisetas /> : selectedCategories.length && selectedCategories[0].title === "Zapatillas" ?  <SizeZapatillas /> : ""}
      <Brand />
     {selectedCategories.length && selectedCategories[0].title === "Botines" ? (
          <Subcategory />
      ) : selectedCategories.length && selectedCategories[0].title === "Camisetas" ? (
          <SubcategoryCamisetas />
      )  : selectedCategories.length && selectedCategories[0].title === "Indumentaria" ? (
        <SubcategoryIndumentaria />
    )  : selectedCategories.length && selectedCategories[0].title === "Accesorios" ? (
      <SubcategoryAccesorios />
  )  :  selectedCategories.length && selectedCategories[0].title === "Zapatillas" ? (
    <SubcategoryZapatillas />
)  :(
        ""
      )} 
    </div>
  );
};

export default ShopSideNav;
