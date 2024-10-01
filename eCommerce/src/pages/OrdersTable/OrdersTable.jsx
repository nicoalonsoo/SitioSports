import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersFromBackend } from "../../utils/api";
import { setBackendOrders } from "../../redux/orebiSlice";
import OrderFilter from "../../components/OrderFilters/OrderFilters";
import { logoTransparent, up, down } from "../../assets/images";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orebiReducer.orders);

  const [filters, setFilters] = useState({
    Aprobado: true,
    Enviado: true,
    Entregado: true,
    "Pago Pendiente": true,
    Cancelado: false,
    rejected: false,
  });

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOrders, setFilteredOrders] = useState([]);

  // 1. Cargar las órdenes del backend al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await fetchOrdersFromBackend();
        dispatch(setBackendOrders(orders)); // Asegúrate de que esta acción no duplique las órdenes.
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // 2. Filtrar órdenes cuando los filtros o las órdenes cambien
  useEffect(() => {
    const applyFilters = () => {
      const filtered = orders.filter((order) => {
        // Verificar si el estado de la orden coincide con los filtros seleccionados
        const status = order.status || "Desconocido";

        // Si el estado de la orden está habilitado en los filtros
        if (filters[status]) {
          return true;
        }

        // Si el estado está vacío o no definido, lo consideramos "Cancelado"
        if (status === "" && filters["Cancelado"]) {
          return true;
        }

        return false;
      });

      setFilteredOrders(filtered);
    };

    applyFilters();
  }, [filters, orders]);

  // 3. Manejar el cambio de filtros
  const handleOrderFilter = (name, checked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  // 4. Paginación
  const count = filteredOrders.length;
  const usersPerPage = 10;
  const totalPages = Math.ceil(count / usersPerPage);
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
    <div className="overflow-x-auto">
      <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-6 mt-4 bg-white shadow-lg px-12">
          <div className="flex justify-start space-x-6 items-center pb-4">
            <a href="/admin">
              <img className="w-20" src={logoTransparent} alt="" />
            </a>
            <h1 className="text-3xl font-bold text-gray-700">Ordenes Sitio Sports</h1>
          </div>
          <div className="flex justify-between">
            <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 bg-transparent">
              <div className="flex flex-wrap items-stretch w-full h-full mb-2 relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-base text-gray-500 font-thin"
                  placeholder="Buscar"
                />
              </div>
            </div>
            <div className="flex">
              <OrderFilter filters={filters} handleOrderFilter={handleOrderFilter} />
            </div>
          </div>
        </div>

        <div className="align-middle inline-block min-w-full shadow bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="align-middle min-w-full">
            <thead>
              <tr>
                {/* Encabezado de la tabla */}
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider align-middle"></th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider align-middle">
                  Nombre
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Mail
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Fuente
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                  Fecha de Creación
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {filteredOrders?.map((order) => (
                <tr key={order.id}>
                  {/* Renderiza cada fila de la tabla */}
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-gray-800">#{order.order_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">{order.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    ${order.transaction_amount}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {order.order_type}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <span className={`flex justify-center text-center px-3 py-1 font-semibold ${order.status === 'approved' || order.status === 'Aprobado' ? 'bg-green-200' : order.status === 'Enviado' ? "bg-yellow-200": order.status === 'Pago Pendiente' ? "bg-blue-200" : 'bg-red-200'}`}>
                      {order.status === "rejected" ? "Tarjeta Rechazada" : order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {order.createdAt.slice(0, 10)}
                  </td>
                  <td className="py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <a
                      href={`/orderdetailbdd/${order.id}`}
                      className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                    >
                      Detalle
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
