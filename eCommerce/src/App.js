import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CustomMade from "./pages/CustomMade/CustomMade";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTable from "./pages/UserTable/UserTable";
import ProductTable from "./pages/ProductTable/ProductTable";
import OrdersTable from "./pages/OrdersTable/OrdersTable";
import OrderDetailBdd from "./pages/OrderDetailBdd/OrderDetailBdd";
import OrderForm from "./pages/OrderDetailBdd/OrderForm";
import ProductForm from "./pages/ProductForm/ProductForm";
import ProductDetailBdd from "./pages/ProductDetailBdd/ProductDetailBdd";
import ShopByCommissions from "./pages/Shop/ShopByCommissions";
import CommissionsTableBdd from "./pages/CommissionsBdd/CommissionsTableBdd";
import Admin from "./pages/Admin/Admin";
import DiscountsTable from "./pages/Discounts/DiscountsTable";
import DiscountsForm from "./pages/Discounts/DiscountsForm";
import { useLocation } from "react-router-dom";
import HeaderPayment from "./components/home/Header/HeaderPayment";
import CommissionsDetailBdd from "./pages/CommissionsBdd/CommissionsDetail";
import Help from "./pages/Help/Help";
import TermsAndCondition from "./pages/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import AfterTransfer from "./pages/AfterOrders/AfterTransfer";
import AfterMp from "./pages/AfterOrders/AfterMpSuccess";
import AfterMpDenied from "./pages/AfterOrders/AfterMpDenied";
import AfterMpPendient from "./pages/AfterOrders/AfterMpPendient";
import ProductCommissionsForm from "./pages/ProductForm/ProductCommissionsForm";
import Returnings from "./pages/Help/Returnings";
import Shipping from "./pages/Help/Shipping";
import Payments from "./pages/Help/Payments";
import OrdersFollows from "./pages/Help/OrdersFollows";
import SizeGuides from "./pages/Help/SizeGuides";
import Login from "./components/AdminLogin/AdminLogin";
import { getProtectedData } from "./utils/api";
import NotFound from "./pages/NotFound/NotFound"; 
import WhatsAppButton from "./components/Whatsapp/WhatsappButton";
import AboutUs from "./pages/AboutUs/AboutUs";
import ArrowUpScroll from "./components/ArrowUpScroll/ArrowUpScroll";

const Layout = () => {
  const location = useLocation();
  const showHeader = location.pathname !== "/paymentgateway";
  return (
    <div className="overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {showHeader ? (
        <div className="bg-black w-screen h-10 flex justify-center items-center overflow-hidden">
          <p className="text-[13px] text-gray-200 uppercase">
          🏷️ 15% de descuento pagando de contado 🏷️
          </p>
        </div>
      ) : (
        ""
      )}
      {showHeader ? <Header /> : <HeaderPayment />}
      {showHeader ? <SpecialCase /> : ""}
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
      <WhatsAppButton />
      <ArrowUpScroll />
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await getProtectedData();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          {/* ==================== Header Navlink Start here =================== */}
          <Route index element={<Home />}></Route>
          <Route path="/catalogo" element={<Shop />}></Route>
          <Route path="/encargo" element={<ShopByCommissions />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/ayuda" element={<Help />}></Route>
          <Route path="/sobre-nosotros" element={<AboutUs />}></Route>
          <Route
            path="/terminos-y-condiciones"
            element={<TermsAndCondition />}
          ></Route>
          <Route
            path="/politicas-de-privacidad"
            element={<PrivacyPolicy />}
          ></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/encargo" element={<CustomMade />}></Route>
          <Route path="/journal" element={<Journal />}></Route>
          <Route
            path="/orden-transferencia-confirmada/:orden"
            element={<AfterTransfer />}
          ></Route>
          <Route
            path="/orden-mp-confirmada/:orden"
            element={<AfterMp />}
          ></Route>
          <Route
            path="/orden-mp-rechazada/:orden"
            element={<AfterMpDenied />}
          ></Route>
          <Route
            path="/orden-mp-pendiente/:orden"
            element={<AfterMpPendient />}
          ></Route>

          <Route
            path="/seguimiento-de-ordenes"
            element={<OrdersFollows />}
          ></Route>
          <Route path="/devoluciones" element={<Returnings />}></Route>
          <Route path="/envios" element={<Shipping />}></Route>
          <Route path="/metodos-de-pago" element={<Payments />}></Route>
          <Route path="/guia-de-talles" element={<SizeGuides />}></Route>

          {/* ==================== Header Navlink End here ===================== */}
          <Route path="/category/:category" element={<Offer />}></Route>
          <Route path="/producto/:slug" element={<ProductDetails />}></Route>
          <Route path="/carrito" element={<Cart />}></Route>
          <Route path="/paymentgateway" element={<Payment />}></Route>
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>

        <Route path="/usertable" element={isAuthenticated ? <UserTable /> : <Login />}></Route>
        <Route path="/orderstable" element={isAuthenticated ? <OrdersTable /> : <Login />}></Route>
        <Route
          exact
          path="/orderdetailbdd/:id"
          element={isAuthenticated ? <OrderDetailBdd /> : <Login />}
        ></Route>
        <Route path="/uploadorder" element={isAuthenticated ? <OrderForm /> : <Login />}></Route>
        <Route exact path="/producttable" element={isAuthenticated ? <ProductTable /> : <Login />}></Route>
        <Route
          exact
          path="/commissionstable"
          element={isAuthenticated ? <CommissionsTableBdd /> : <Login />}
        ></Route>
        <Route
          exact
          path="/commissionsdetail/:id"
          element={isAuthenticated ? <CommissionsDetailBdd /> : <Login />}
        ></Route>
        <Route
          exact
          path="/productdetailbdd/:id"
          element={isAuthenticated ? <ProductDetailBdd /> : <Login />}
        ></Route>
        <Route path="/uploadproduct" element={isAuthenticated ? <ProductForm /> : <Login />}></Route>
        <Route path="/discounts" element={isAuthenticated ? <DiscountsTable /> : <Login />}></Route>
        <Route path="/discounts-form" element={isAuthenticated ? <DiscountsForm /> : <Login />}></Route>
        <Route
          path="/cargar-producto-encargo"
          element={isAuthenticated ? <ProductCommissionsForm /> : <Login />}
        ></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin"
          element={isAuthenticated ? <Admin /> : <Login />}
        />
        <Route path="*" element={<NotFound />} /> 
      </Route>
    )
  );

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
