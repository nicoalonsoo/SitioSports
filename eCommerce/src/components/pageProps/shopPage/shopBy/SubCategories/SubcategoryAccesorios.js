import React, { useState, useEffect } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubcategory } from "../../../../../redux/orebiSlice";
import { TiArrowSortedDown } from "react-icons/ti";
const SubcategoryAccesorios = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const checkedSubcategorys = useSelector(
    (state) => state.orebiReducer.checkedSubcategorys
  );
  const products = useSelector((state) => state.orebiReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkedSubcategorys.length !== 0) {
      setShowFilter(true);
    }
  }, [checkedSubcategorys]);

  const subcategory = [
    {
      _id: 10016,
      title: "Mochila",
    },
    {
      _id: 10017,
      title: "Medias",
    },
    {
      _id: 10018,
      title: "Guantes",
    },
    {
      _id: 10019,
      title: "Canilleras",
    },
    {
      _id: 10020,
      title: "Termo",
    },
  ];

  const handleToggleSubcategory = (subcategory) => {
    dispatch(toggleSubcategory(subcategory));
  };

  const handleFilterToggle = () => {
    if (checkedSubcategorys.length === 0) {
      setShowFilter(!showFilter);
    }
  };
  return (
    <div className="w-full">
      <div
        className="flex justify-between cursor-pointer pb-2"
        onClick={handleFilterToggle}
      >
        <h1 className="text-lg lg:text-xl fotn-normal font-semibold" icons={true}>Subcategoria</h1>
        <TiArrowSortedDown
          className={`text-lg ${
            showFilter ? "rotate-180" : "rotate-0"
          } duration-300`}
        />
      </div>
      <div>
        {showFilter ? (
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-100 lg:text-[#767676]">
            {subcategory.map((item) => (
              <li
                key={item._id}
                className="cursor-pointer border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 lg:hover:text-primeColor hover:border-gray-400 duration-300"
                onClick={() => handleToggleSubcategory(item)}
              >
                <input
                  type="checkbox"
                  id={item._id}
                  checked={checkedSubcategorys.some((b) => b._id === item._id)}
      
                 
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
            {/* <li onClick={() => console.log(checkedSubcategorys)}>test</li> */}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SubcategoryAccesorios;
