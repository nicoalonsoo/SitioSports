import React, { useState, useEffect } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCategory,
  cleanCategories,
  cleanSubcategories,
  cleanSizes,
} from "../../../../redux/orebiSlice";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [checkedCategoriesState, setCheckedCategoriesState] = useState([]);

  const checkedCategorys = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const products = useSelector((state) => state.orebiReducer.products);
  const dispatch = useDispatch();

  const category = [
    {
      _id: 9006,
      title: "Botines",
    },
    {
      _id: 9009,
      title: "Camisetas",
    },
    {
      _id: 9007,
      title: "Accesorios",
    },
    {
      _id: 9005,
      title: "Indumentaria",
    },
    {
      _id: 9004,
      title: "Zapatillas",
    },
  ];

  const handleToggleCategory = (category) => {
    dispatch(cleanCategories());
    dispatch(cleanSizes());
    dispatch(cleanSubcategories());
    dispatch(toggleCategory(category));
  };

  useEffect(() => {
    setCheckedCategoriesState(checkedCategorys);
  }, [checkedCategorys]);

  return (
    <div className="w-full">
      <NavTitle title="Categoria" icons={true} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-100 lg:text-[#767676]">
          {category.map((item) => (
            <li
              key={item._id}
              className="border-b-[1px] cursor-pointer border-b-[#F0F0F0] pb-2 flex items-center gap-2 lg:hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                type="checkbox"
                id={item._id}
                checked={checkedCategoriesState.some((b) => b._id === item._id)}
                onChange={() => handleToggleCategory(item)}
              />
              {item.title}
              {item.icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
