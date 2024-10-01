import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Flex from "../../designLayouts/Flex";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderBottom = ({handleSearchBar}) => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = products.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const handleSearchShop = () => {
    if (searchQuery) {
      navigate(`/catalogo?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

 const handleOpenSearchBar = () => {
    handleSearchBar()
    setShowSearchBar(true)

  }

  const handleCloseSearchBar = () => {
    setSearchQuery("");
    setShowSearchBar(false);
    handleSearchBar()
  }
  return (
    <Flex className={`flex flex-col lg:flex-row items-start lg:items-center justify-end ${showSearchBar ? "w-full" : "w-full"} lg:w-2/3 h-full lg:h-14`}>
      <div className="relative w-full lg:w-auto h-[40px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl shadow-sm">
        {showSearchBar ? (
          <>
            <button onClick={handleCloseSearchBar}>
              <IoIosArrowBack className="w-5 h-5 cursor-pointer" />
            </button>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="flex-grow flex items-center lg:hidden"
            >
              <input
                className="h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px] flex-grow"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Buscar"
              />
              <button onClick={handleSearchShop}>
                <FaSearch className="w-5 h-5 cursor-pointer" />
              </button>
            </motion.div>
          </>
        ) : (
          <button className="lg:hidden" onClick={handleOpenSearchBar}>
            <FaSearch className="w-5 h-5 cursor-pointer" />
          </button>
        )}
        <div className="hidden lg:flex flex-grow items-center">
          <input
            className="h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px] flex-grow"
            type="text"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Buscar"
          />
          <button onClick={handleSearchShop}>
            <FaSearch className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
        {searchQuery && (
          <div
            className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer p-2`}
          >
            {searchQuery &&
              filteredProducts.map((item) => (
                <div
                  onClick={() =>
                    navigate(
                      `/producto/${item.productName
                        .toLowerCase()
                        .split(" ")
                        .join("")}`,
                      {
                        state: {
                          item: {
                            _id: item.id,
                            badge: item.badge,
                            img: item.variants[0].imgUrl[0],
                            productName: item.productName,
                            price: item.price,
                            compare_price: item.compare_price,
                            brand: item.brand,
                            cat: item.cat,
                            sub_cat: item.sub_cat,
                            sizes: item.sizes,
                            variants: item.variants,
                            description: item.description,
                            color: item.color,
                            discount: item.discount_percentage,
                            video_youtube: item.video_youtube
                          },
                        },
                      }
                    ) &
                    setShowSearchBar(true) &
                    setSearchQuery("")
                  }
                  key={item._id}
                  className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                >
                  <img
                    className="w-24"
                    src={item.variants[0].imgUrl[0]}
                    alt="productImg"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-md">{item.productName}</p>
                    <span className="text-primeColor font-semibold">
                      ${item.price}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </Flex>
  );
};

export default HeaderBottom;
