import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getUsers, updateFilteredUsers } from "../../redux/actions";
// import ExcelDownloadButton from "../../componentes/ExcellButton/excellButton";
// import Dropdown from "../../componentes/Dropdown/Dropdown";
import { up, down } from "../../assets/images";
import { fetchCommissionsFromBackend } from "../../utils/api";
import { setBackendCommissions } from "../../redux/orebiSlice";
import { logo, logoTransparent } from "../../assets/images";
const CommissionsTableBdd = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchCommissionsFromBackend();
        dispatch(setBackendCommissions(products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const products = useSelector((state) => state.orebiReducer.commissions);
  const count = products?.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [changes, setChanges] = useState({});
  const [isChanging, setIsChanging] = useState(false);
  const [filter, setFilter] = useState({});
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [order, setOrder] = useState("asc");

  // const urlParams = new URLSearchParams(window.location.search);
  // const accessCode = urlParams.get("code");
  // useEffect(() => {
  //   if (isSearching) {
  //     handleSearchEvent();
  //   } else {
  //     if (Object.keys(filter).length !== 0) {
  //       handleFilter(filter);
  //     } else {
  //       if (accessCode) {
  //         dispatch(getUsers(accessCode, order, currentPage));
  //       }
  //     }
  //   }
  // }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const usersPerPage = 10;
  const totalPages = Math.ceil(count / usersPerPage);
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(i);
  }
  const lastPage = pageButtons.length - 1;
  // Calcula el rango de páginas que deseas mostrar alrededor de la página actual.
  const range = 2; // Por ejemplo, mostrará 2 páginas antes y 2 después de la página actual.

  // Calcula el rango de páginas para mostrar.
  const startPage = Math.max(currentPage - range, 1); // Evita números negativos.
  const endPage = Math.min(currentPage + range, totalPages); // Evita exceder el número total de páginas.

  // Crea un arreglo de números de página dentro del rango calculado.
  const pageRange = [];
  for (let i = startPage; i <= endPage; i++) {
    pageRange.push(i);
  }

  const handleCheckboxChange = (userId) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      [userId]: {
        ...prevChanges[userId],
        checked: !prevChanges[userId]?.checked || false, // Cambia el estado del checkbox
      },
    }));
  };

  const handleOwnerChange = (userId, ownerValue) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      [userId]: {
        ...prevChanges[userId],
        owner: ownerValue, // Actualiza el valor del campo owner
      },
    }));
  };

  // const handleSaveChanges = () => {
  //   const usersWithChanges = Object.keys(changes).map((userId) => ({
  //     id: userId,
  //     owner: changes[userId].owner,
  //     checked: changes[userId].checked,
  //   }));
  //   axios
  //     .put("/users", { users: usersWithChanges })
  //     .then((response) => {
  //       // Maneja la respuesta de la solicitud, por ejemplo, muestra una notificación de éxito
  //       alert("Cambios guardados con éxito");
  //       if (Object.keys(filter).length === 0) {
  //         dispatch(getUsers(accessCode, order, currentPage));
  //       } else {
  //         handleFilter(filter);
  //       }
  //       setIsChanging(false);
  //     })
  //     .catch((error) => {
  //       // Maneja errores, muestra una notificación de error, etc.
  //       console.error("Error al guardar los cambios", error);
  //       setIsChanging(false);
  //     });
  // };

  // const handleChange = () => {
  //   setIsChanging(true);
  // };

  // const handleFilter = (e) => {
  //   if (Object.keys(e).length > 0) {
  //     axios
  //       .post(`/filter?code=${accessCode}&page=${currentPage}`, e)
  //       .then((res) => {
  //         const users = res.data;
  //         dispatch(updateFilteredUsers(users));
  //         setFilter(e);
  //       })
  //       .catch((err) => alert(err));
  //   } else {
  //   }
  // };

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  // };

  // const handleSubmitSearch = (e) => {
  //   e.preventDefault();
  //   handleSearchEvent();
  // };
  // const handleNotSearching = (e) => {
  //   e.preventDefault();
  //   setIsSearching(false);
  //   setSearch("");
  //   dispatch(getUsers(accessCode, order, 1));
  // };

  // const handleSearchEvent = () => {
  //   dispatch(getUsers(accessCode, order, currentPage, search));
  //   setIsSearching(true);
  // };

  // const handleOrder = (value) => {
  //   setOrder(value)
  //   dispatch(getUsers(accessCode, value, currentPage, search));
  // }

  return (
    <div className="overflow-x-auto ">
      <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-6 mt-4 overflow-hidden bg-white shadow-lg px-12">
          <div className="flex justify-start space-x-6 items-center pb-4">
          <a href="/admin"><img className="w-20" src={logoTransparent} alt="" /></a> 
            <h1 className="text-3xl font-bold text-gray-700">
              Productos por encargo Sitio Sports
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 bg-transparent">
              <div className="flex flex-wrap items-stretch w-full h-full mb-2 relative">
                <input
                  value={search}
                  // onChange={handleSearch}
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-base text-gray-500 font-thin"
                  placeholder="Search"
                />
                <div className="flex">
                  {isSearching ? (
                    <button
                      // onClick={(e) => handleNotSearching(e)}
                      className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm"
                    >
                      X
                    </button>
                  ) : (
                    <button
                      // onClick={(e) => handleSubmitSearch(e)}
                      className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm"
                    >
                      <svg
                        width="18"
                        height="18"
                        className="w-4 lg:w-auto"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                          stroke="#455A64"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.9993 16.9993L13.1328 13.1328"
                          stroke="#455A64"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex">
              {/* <Dropdown handleFilter={handleFilter} /> */}
              <div className="mr-2">{/* <ExcelDownloadButton /> */}</div>
              <div>
                <a
                  href="/uploadproduct"
                  className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                >
                  Nuevo Producto
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="py-4"></div> */}
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="align-middle min-w-full">
            <thead>
              <tr>
                <th className="my-custom-header-style px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider align-middle lg:my-lg-custom-header-style"></th>
                <th className="my-custom-header-style my-lg-custom-header-style px-3 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider align-middle">
                  Producto
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider xl:ml-15">
                  Precio
                </th>
           
                <th className="px-3 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Marca
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Categoría
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Status
                </th>
                {/* <th className="flex px-3 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Estado
                </th> */}
                <th className="px-3 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider relative">
                  Fecha de Creación
                  {order === "asc" ? (
                    <button
                    // onClick={() => handleOrder("desc")}
                    >
                      <img
                        src={down}
                        alt="arrow up "
                        className="absolute top-1/2 transform -translate-y-1/2 text-blue-500"
                        style={{ width: "16px", height: "16px" }} // Ajusta el tamaño según tus necesidades
                      />
                    </button>
                  ) : (
                    <button
                    // onClick={() => handleOrder("asc")}
                    >
                      <img
                        src={up} // Ruta a tu imagen de flecha
                        alt="arrow up "
                        className="absolute top-1/2 transform -translate-y-1/2 text-blue-500"
                        style={{ width: "16px", height: "16px" }} // Ajusta el tamaño según tus necesidades
                      />
                    </button>
                  )}
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.map((product, index) => (
                <tr key={product.id}>
                  <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="text-sm leading-5 text-gray-800">
                          {currentPage === 1
                            ? index + 1
                            : (currentPage - 1) * 10 + index + 1}
                        </div>
                      </div>
                      <div className="w-20">
                        <img src={product.variants[0].imgUrl[0]} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-center text-sm leading-5 text-blue-900">
                      {product.productName}
                    </div>
                  </td>
                  <td className="text-center px-3 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.price}
                  </td>
                  <td className="text-center px-3 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.brand}
                  </td>
                  <td className="text-center px-3 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.cat}
                  </td>
                  <td className="px-3 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    <span className="flex justify-center text-center relative  px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span
                        aria-hidden
                        className={` 
                          ${
                            product.status === "Activo"
                              ? "absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              : "absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          }
                        `}
                      ></span>
                      <span className="relative text-xs">Activo</span>
                    </span>
                  </td>
                  {/* 
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    <input
                      placeholder={product.checked}
                      type="checkbox"
                      checked={
                        isChanging
                          ? !!changes[product.id]?.checked
                          : product.checked
                      }
                      // onChange={
                      //   isChanging ? () => handleCheckboxChange(user.id) : null
                      // }
                    />
                  </td> */}
                  <td className="text-center px-3 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                    {product.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-3 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <a
                      href={`/commissionsdetail/${product.id}`}
                      // onClick={handleChange}
                      className="px-3 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                    >
                      Ver Detalle
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
            <div>
              <p className="text-sm leading-5 text-blue-700">
                <span className="font-medium">
                  {" "}
                  {currentPage === 1 ? 1 : 10 * (currentPage - 1) + 1}{" "}
                </span>
                a
                <span className="font-medium">
                  {" "}
                  {currentPage === 1 ? 10 : 10 * currentPage}{" "}
                </span>
                de
                <span className="font-medium"> {count} </span>
                resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex shadow-sm" />
              <div className="flex">
                {currentPage !== 1 ? (
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  ""
                )}
                {pageRange?.map((pag) => (
                  <button
                    key={pag}
                    className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 ${
                      pag === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600"
                    } text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary`}
                    onClick={() => handlePageChange(pag)}
                  >
                    {pag}
                  </button>
                ))}
                {currentPage !== pageButtons[lastPage] ? (
                  <button
                    className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                    aria-label="Next"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionsTableBdd;
