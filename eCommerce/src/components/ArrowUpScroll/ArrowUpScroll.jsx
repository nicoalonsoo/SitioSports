import React from "react";
import { IoIosArrowUp } from "react-icons/io";

const ArrowUpScroll = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <button
        className="fixed bottom-4 left-4 bg-gray-400 hover:bg-gray-500 opacity-75 rounded-full h-32 w-32 flex justify-center items-center text-white z-10 duration-300"
        style={{ height: "50px", width: "50px" }}
        onClick={scrollToTop}
      >
        <IoIosArrowUp size={35} />
      </button>
    </div>
  );
};

export default ArrowUpScroll;
