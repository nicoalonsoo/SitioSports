import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleTags } from "../../../../redux/orebiSlice";
import { TiArrowSortedDown } from "react-icons/ti";
const Tags = () => {
  const [showTags, setShowTags] = useState(false);
  const checkedTags = useSelector(
    (state) => state.orebiReducer.checkedTags
  );
  const dispatch = useDispatch();

  const tags = [
    {
      _id: 2000,
      title: "Deportivo",
    },
    {
      _id: 2001,
      title: "Urbano",
    },
  
  ];

  const handleToggleTags = (tag) => {
    dispatch(toggleTags(tag));
  };

  return (
    <div>
      <div
        onClick={() => setShowTags(!showTags)}
        className="cursor-pointer"
      >
        <NavTitle title="Colecciones" icons={true} />
      </div>
      {showTags && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-gray-100 lg:text-[#767676]">
            {tags.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] cursor-pointer border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
                onClick={() => handleToggleTags(item)}
            >
                <input
                  type="checkbox"
                  id={item._id}
                  checked={checkedTags.some((b) => b._id === item._id)}
                  // onChange={() => handleToggleTags(item)}
                />
                {item.title}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Tags;
