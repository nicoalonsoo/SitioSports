import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logoTransparent } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import { FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanFilters,
  toggleCategory,
  setBackendCommissions,
} from "../../../redux/orebiSlice";
import DropdownBotines from "./DropdownBotines";
import DropdownCamisetas from "./DropdownCamisetas";
import DropdownMedias from "./DropdownMedias";
import HeaderBottom from "./HeaderBottom";
import { fetchCommissionsFromBackend } from "../../../utils/api";

const Header = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.cartProducts);
  const categories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [sidenav, setSidenav] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showBotinesDiv, setShowBotinesDiv] = useState(false);
  const [showZapatillas, setShowZapatillas] = useState(false);
  const [showIndumentaria, setShowIndumentaria] = useState(false);
  const [showCamisetas, setShowCamisetas] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const location = useLocation();

  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchData = async () => {
    try {
      const commissions = await fetchCommissionsFromBackend();
      dispatch(setBackendCommissions(commissions));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCommissionClick = () => {
    dispatch(cleanFilters());
    fetchData();
  };

  const allCategories = [
    { _id: 9006, title: "Botines" },
    { _id: 9009, title: "Camisetas" },
    { _id: 9007, title: "Accesorios" },
    { _id: 9005, title: "Indumentaria" },
    { _id: 9004, title: "Zapatillas" },
  ];

  const handleMouseEnter = (menuSetter) => {
    menuSetter(true);
  };

  const handleMouseLeave = (menuSetter) => {
    menuSetter(false);
  };

  const handleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleNavMobile = (item) => {
    setSidenav(false);
    if (item.title === "Botines") {
      setSidenav(false);
      dispatch(cleanFilters());
      dispatch(toggleCategory({ _id: 9006, title: "Botines" }));
    } else if (item.title === "Camisetas") {
      setSidenav(false);
      dispatch(cleanFilters());
      dispatch(toggleCategory({ _id: 9009, title: "Camisetas" }));
    } else if (item.title === "Accesorios") {
      setSidenav(false);
      dispatch(cleanFilters());
      dispatch(toggleCategory({ _id: 9007, title: "Accesorios" }));
    } else if (item.title === "Indumentaria") {
      setSidenav(false);
      dispatch(cleanFilters());
      dispatch(toggleCategory({ _id: 9005, title: "Indumentaria" }));
    } else if (item.title === "Zapatillas") {
      setSidenav(false);
      dispatch(cleanFilters());
      dispatch(toggleCategory({ _id: 9004, title: "Zapatillas" }));
    }
  };
  return (
    <div className="w-full h-auto lg:h-28 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 md:px-0 lg:px-0 xl:px-4 max-w-container mx-auto relative">
        <Flex className="flex flex-wrap lg:flex-nowrap items-center justify-between h-full lg:mx-4 xl:mx-10 py-2 lg:py-0">
          <Link className="w-full flex justify-center" to="/">
            <div>
              <Image
                className="w-14 lg:w-24 object-cover"
                imgSrc={logoTransparent}
              />
            </div>
          </Link>
          <div className="w-3/5 ">
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center w-full z-50 p-0 gap-x-4"
              >
                <div className="relative">
                  <NavLink
                    key={1002}
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center  text-sm lg:text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fc148c] hoverEffect"
                    to={"/catalogo"}
                    state={{ data: location.pathname.split("/")[1] }}
                    onClick={() => {
                      dispatch(cleanFilters());
                    }}
                  >
                    <li>Catálogo</li>
                  </NavLink>
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(setShowBotinesDiv)}
                  onMouseLeave={() => handleMouseLeave(setShowBotinesDiv)}
                >
                  <NavLink
                    key={1003}
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center  text-sm lg:text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fc148c] hoverEffect"
                    to={"/catalogo"}
                    state={{ data: location.pathname.split("/")[1] }}
                    onClick={() => {
                      dispatch(cleanFilters());
                      dispatch(toggleCategory(allCategories[0]));
                    }}
                  >
                    <li
                      style={{ color: showBotinesDiv ? "#fc148c" : "#767676" }}
                    >
                      Botines
                    </li>
                  </NavLink>
                  <div
                    className={`z-20 top-[20px] left-[-200px] absolute w-[900px] h-auto bg-white ${
                      showBotinesDiv ? "flex" : "hidden"
                    }`}
                  >
                    <DropdownBotines />
                  </div>
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(setShowCamisetas)}
                  onMouseLeave={() => handleMouseLeave(setShowCamisetas)}
                >
                  <NavLink
                    key={1004}
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center text-sm lg:text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fc148c] hoverEffect"
                    to={"/catalogo"}
                    state={{ data: location.pathname.split("/")[1] }}
                    onClick={() => {
                      dispatch(cleanFilters());
                      dispatch(toggleCategory(allCategories[1]));
                    }}
                  >
                    <li
                      style={{ color: showCamisetas ? "#fc148c" : "#767676" }}
                    >
                      Camisetas
                    </li>
                  </NavLink>
                  <div
                    className={`z-20 top-[20px] left-[-200px] absolute w-[900px] h-auto bg-white ${
                      showCamisetas ? "flex" : "hidden"
                    }`}
                  >
                    <DropdownCamisetas />
                  </div>
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(setShowIndumentaria)}
                  onMouseLeave={() => handleMouseLeave(setShowIndumentaria)}
                >
                  <NavLink
                    key={1005}
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center mx-4 text-sm lg:text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fc148c] hoverEffect"
                    to={"/catalogo"}
                    state={{ data: location.pathname.split("/")[1] }}
                    onClick={() => {
                      dispatch(cleanFilters());
                      dispatch(toggleCategory(allCategories[3]));
                    }}
                  >
                    <li
                      style={{
                        color: showIndumentaria ? "#fc148c" : "#767676",
                      }}
                    >
                      Indumentaria
                    </li>
                  </NavLink>
                  <div
                    className={`z-20 top-[20px] left-[-200px] absolute w-[900px] h-auto bg-white ${
                      showIndumentaria ? "flex" : "hidden"
                    }`}
                  >
                    {/* <DropdownMedias /> */}
                  </div>
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(setShowZapatillas)}
                  onMouseLeave={() => handleMouseLeave(setShowZapatillas)}
                >
                  <NavLink
                    key={1006}
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center  text-sm lg:text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fc148c] hoverEffect"
                    to={"/catalogo"}
                    state={{ data: location.pathname.split("/")[1] }}
                    onClick={() => {
                      dispatch(cleanFilters());
                      dispatch(toggleCategory(allCategories[4]));
                    }}
                  >
                    <li
                      style={{ color: showZapatillas ? "#fc148c" : "#767676" }}
                    >
                      Zapatillas
                    </li>
                  </NavLink>
                  <div
                    className={`z-20 top-[20px] left-[-200px] absolute w-[900px] h-auto bg-white ${
                      showZapatillas ? "flex" : "hidden"
                    }`}
                  >
                    {/* <DropdownMedias /> */}
                  </div>
                </div>

                <div className="relative">
                  <NavLink
                    key={1007}
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center  text-sm lg:text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fc148c] hoverEffect"
                    to={"/encargo"}
                    state={{ data: location.pathname.split("/")[1] }}
                    onClick={handleCommissionClick}
                  >
                    <li>Encargo</li>
                  </NavLink>
                </div>

                <div className="relative">
                  <NavLink
                    key={1009}
                    className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center  text-sm lg:text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#fc148c] hoverEffect"
                    to={"/ayuda"}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li>Ayuda</li>
                  </NavLink>
                </div>
              </motion.ul>
            )}
            {sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                    <img
                      className="w-28 mb-6"
                      src={logoTransparent}
                      alt="logoLight"
                    />
                    <ul className="text-gray-200 flex flex-col gap-2">
                      {navBarList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={
                           
                              () => handleNavMobile(item)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                    <span
                      onClick={() => setSidenav(false)}
                      className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300"
                    >
                      <MdClose />
                    </span>
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          <div className="w-full flex justify-between w-auto gap-0 lg:gap-4 mt-2 lg:mt-0 items-center cursor-pointer relative">
            <div className="flex lg:hidden mr-4  -ml-4">
              <HiMenuAlt2
                className="text-4xl"
                onClick={() => setSidenav(!sidenav)}
              />
            </div>
            <div className="flex items-center">
              <div className="justify-end flex">
                <HeaderBottom handleSearchBar={handleSearchBar} />
              </div>
              <Link to="/carrito">
                {!showSearchBar ? (
                  <div className="relative">
                    <FaShoppingCart />
                    <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                      {products.length > 0 ? products.length : 0}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </Link>
            </div>
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
