import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsFromBackend } from "../../utils/api";
import { setBackendProducts } from "../../redux/orebiSlice";
import { logoTransparent, up, down } from "../../assets/images";
import ProductFilter from "../../components/ProductFilter/ProductFilter";

const ProductTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProductsFromBackend();
        dispatch(setBackendProducts(products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const products = useSelector((state) => state.orebiReducer.products);
  const [filters, setFilters] = useState({
    Activo: true,
    Desactivado: true,
  });

  const handleProductFilter = (name, checked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const filteredProducts = products?.filter(product => 
    (product.disabled === false && filters["Activo"]) || 
    (product.disabled === true && filters["Desactivado"])
  );

  const count = filteredProducts?.length;

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(count / usersPerPage);
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(i);
  }
  const lastPage = pageButtons.length - 1;
  const range = 2;
  const startPage = Math.max(currentPage - range, 1);
  const endPage = Math.min(currentPage + range, totalPages);
  const pageRange = [];
  for (let i = startPage; i <= endPage; i++) {
    pageRange.push(i);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="overflow-x-auto ">
      <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-6 mt-4 overflow-hidden bg-white shadow-lg px-12">
          <div className="flex justify-start space-x-6 items-center pb-4">
            <a href="/admin">
              <img className="w-20" src={logoTransparent} alt="" />
            </a>
            <h1 className="text-3xl font-bold text-gray-700">
              Productos Sitio Sports
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <ProductFilter filters={filters} handleProductFilter={handleProductFilter} />
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
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="align-middle min-w-full">
            <thead>
              <tr>
                <th className="my-custom-header-style px-1 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider align-middle lg:my-lg-custom-header-style"></th>
                <th className="my-custom-header-style my-lg-custom-header-style px-1 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider align-middle">
                  Producto
                </th>
                <th className="px-1 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider xl:ml-15">
                  Precio
                </th>
                <th className="px-1 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Marca
                </th>
                <th className="px-1 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Categoría
                </th>
                <th className="px-1 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Estado
                </th>
                <th className="px-1 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider relative">
                  Fecha de Creación
                </th>
                <th className="px-1 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredProducts?.map((product, index) => (
                <tr key={product.id}>
                  <td className="px-1 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm leading-5 text-gray-800">
                          {currentPage === 1
                            ? index + 1
                            : (currentPage - 1) * 10 + index + 1}
                        </div>
                      </div>
                      <div className="w-20">
                        <img
                          src={
                            product.variants.length > 0 &&
                            product.variants[0].imgUrl.length > 0
                              ? product.variants[0].imgUrl[0]
                              : ""
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-1 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-center text-sm leading-5 text-blue-900">
                      {product.productName}
                    </div>
                  </td>
                  <td className="text-center px-1 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.price}
                  </td>
                  <td className="text-center px-1 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.brand}
                  </td>
                  <td className="text-center px-1 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.cat}
                  </td>
                  <td className="px-1 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    <span className="flex justify-center text-center relative  px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span
                        aria-hidden
                        className={` 
                          ${
                            product.disabled === false
                              ? "absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              : "absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          }
                        `}
                      ></span>
                      <span className="relative text-xs">
                        {product.disabled === false ? "Activo" : "Desactivado"}
                      </span>
                    </span>
                  </td>
                  <td className="text-center px-1 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                    {product.createdAt.slice(0, 10)}
                  </td>
                  <td className="px-1 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <a
                      href={`/productdetailbdd/${product.id}`}
                      className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
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

export default ProductTable;
