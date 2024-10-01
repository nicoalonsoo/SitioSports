import React from "react";
import { logoTransparent } from "../../assets/images";
const Admin = () => {
  return (
    <div className="px-32 py-10">
      <div className="w-full flex justify-between">
        <a href="/producttable">
          <img className="w-32" src={logoTransparent} alt="" />
        </a>
      </div>
      <div className="w-full flex justify-center items-center space-x-4">
        <a
          href="/producttable"
          className="flex justify-center items-center p-[30px] border-[2px] border-[#e5e7eb] text-2xl hover:bg-[#fc148c] duration-300 hover:text-white"
        >
          Gestionar Productos
        </a>
        <a
          href="/orderstable"
          className="flex justify-center items-center p-[30px] border-[2px] border-[#e5e7eb] text-2xl hover:bg-[#fc148c] duration-300 hover:text-white"
        >
          Gestionar Pedidos
        </a>
      
        <a
          href="/discounts"
          className="flex justify-center items-center p-[30px] border-[2px] border-[#e5e7eb] text-2xl hover:bg-[#fc148c] duration-300 hover:text-white"
        >
          Gestionar Cupones
        </a>
      </div>
    </div>
  );
};

export default Admin;
