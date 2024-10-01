import React, { useState } from "react";
import { motion } from "framer-motion";
import FooterListTitle from "./FooterListTitle";
import { NavLink} from "react-router-dom";
import { tarjetas, otherPaymentMethods } from "../../../constants";
import {
  cleanFilters,
  toggleCategory,
} from "../../../redux/orebiSlice";
import { useDispatch } from "react-redux";
const Footer = () => {
  const dispatch = useDispatch();
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const allCategories = [
    { _id: 9006, title: "Botines" },
    { _id: 9009, title: "Camisetas" },
    { _id: 9007, title: "Accesorios" },
    { _id: 9005, title: "Indumentaria" },
    { _id: 9004, title: "Zapatillas" },
  ];

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="w-full bg-[#F5F5F3] py-20 overflow-hidden">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle title=" Medios de pago" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap py-3 gap-2">
              {tarjetas?.map((tarjeta) => (
                <img className="w-14" src={tarjeta} />
              ))}
              {otherPaymentMethods?.map((payment) => (
                <img src={payment} className="w-14" />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 ">
          <FooterListTitle title="Navegación" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <NavLink to="/catalogo"> Catálogo</NavLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <NavLink 
               to={"/catalogo"}
               onClick={() => {
                dispatch(cleanFilters());
                dispatch(toggleCategory(allCategories[0]));
              }}
             > Botines</NavLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <NavLink
               onClick={() => {
                dispatch(cleanFilters());
                dispatch(toggleCategory({ _id: 9009, title: "Camisetas" }));
              }}
              to="/catalogo"> Camisetas</NavLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <NavLink 
               onClick={() => {
                dispatch(cleanFilters());
                dispatch(toggleCategory(allCategories[3]));
              }}
              to="/catalogo"> Indumentaria</NavLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <NavLink 
               onClick={() => {
                dispatch(cleanFilters());
                dispatch(toggleCategory(allCategories[4]));
              }}
              to="/catalogo"> Zapatillas</NavLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <NavLink 
               onClick={() => {
                dispatch(cleanFilters());
                dispatch(toggleCategory(allCategories[2]));
              }}
              to="/catalogo"> Accesorios</NavLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <NavLink to="/ayuda"> Ayuda</NavLink>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <NavLink to="/sobre-nosotros"> Sobre Nosotros</NavLink>
            </li>
          </ul>
        </div>
        <div className="col-span-2">
          <FooterListTitle title="Contactanos" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="mailto:sitiosports.contacto@gmail.com" target="_blank">
                sitiosports.contacto@gmail.com
              </a>
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="https://wa.me/+5493812097082" target="_blank">
              +54 9 3812 09‑7082
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4 justify-start">
          <FooterListTitle title="Newsletter" />
          <div className="w-full">
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                Sucrito!
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-left items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder=" Ingrese su email ..."
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white text-gray-600 px-2 rounded-md  h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  Subscribirme
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
