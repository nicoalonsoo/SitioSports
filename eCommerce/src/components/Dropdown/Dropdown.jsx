import React, { useState } from "react";

function Dropdown({ handleFilter }) {

  const [valueFilter, setValueFilter ] = useState({})

  const handleValue = (e) => {
    const updatedValueFilter = {
      ...valueFilter,
      [e.target.name]: e.target.value,
    };
    setValueFilter(updatedValueFilter);
    handleFilter(updatedValueFilter); 
  };

  return (
    <div className="flex">
      <div className="mr-2 ">
        <label htmlFor="select" className="text-blue-500 font-semibold text-sm py-1">
          Filtrar por Status
        </label>

        <select name="status" className="border-blue-500 border text-blue-500 rounded cursor-pointer" onChange={(e) => handleValue(e)}>
          <option value="Activo">Activo</option>
          <option value="Desactivado">Desactivado</option>
          <option value="todos">Activos y desactivados</option>
        </select>
      </div>
      <div className="mr-2">
        <label htmlFor="select" className="text-blue-500 font-semibold text-sm py-1">
           Filtrar por Paises
        </label>
        <select name="country" className="border-blue-500 border text-blue-500 rounded cursor-pointer" onChange={(e) => handleValue(e)}>
          <option value="">Todos los Países</option>
          <option value="Argentina">Argentina</option>
          <option value="Chile">Chile</option>
          <option value="Mexico">Mexico</option>
          <option value="Peru">Peru</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Colombia">Colombia</option>
          <option value="Panama">Panama</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Honduras">Honduras</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Bermuda">Bermuda</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Grenada">Grenada</option>
          <option value="Barbados">Barbados</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Cuba">Cuba</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Dominica">Dominica</option>
          <option value="Haiti">Haiti</option>
          <option value="Cuba">Cuba</option>
          <option value="Aruba">Aruba</option>
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
