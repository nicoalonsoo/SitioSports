import React, { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import { useDispatch } from "react-redux";
import { fetchProductsFromBackend, fetchPromotionsFromBackend } from "../../utils/api";
import { setBackendProducts, setBackendPromotions } from "../../redux/orebiSlice";

const Home = () => {
  // const products = useSelector((state) => state.orebiReducer.products);
  // const promotions = useSelector((state) => state.orebiReducer.promotions);

  
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProductsFromBackend();
        const activeProducts = products.filter(product => !product.disabled);
        dispatch(setBackendProducts(activeProducts));
        const promotions = await fetchPromotionsFromBackend();
        const activePromotions = promotions.promotion.filter(product => !product.disabled);
        dispatch(setBackendPromotions(activePromotions));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="w-full mx-auto overflow-hidden">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4 space-y-2">
        <NewArrivals />
        <Sale />
        <BestSellers />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Home;
