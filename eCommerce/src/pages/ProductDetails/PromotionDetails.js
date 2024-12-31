import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import PromotionInfo from "../../components/pageProps/productDetails/PromotionInfo";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import CarruselDetail from "../../components/pageProps/productDetails/CarruselDetail";
import { fetchPromotionBySlugFromBackend } from "../../utils/api";
import { setPromotionById, cleanPromotionById } from "../../redux/orebiSlice";
import { useDispatch, useSelector } from "react-redux";
import { spinner } from "../../assets/images";
import ImageDetail from "../../components/pageProps/productDetails/ImageDetail";

const PromotionDetails = () => {
  const location = useLocation();
  const { slug } = useParams();
  const [prevLocation, setPrevLocation] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el loading
  const dispatch = useDispatch();

  useEffect(() => {
    setProductInfo(location.state?.item || {});
    setDiscountedPrice(location.state?.discountedPrice || "");
    setPrevLocation(location.pathname);

    const fetchData = async () => {
      try {
        const product = await fetchPromotionBySlugFromBackend(slug);
        dispatch(setPromotionById(product));
        setIsLoading(false); // Desactivar el loading cuando los datos se cargan
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Desactivar el loading incluso si hay un error
      }
    };

    fetchData();

    // Cleanup function to run when the component unmounts
    return () => {
      dispatch(cleanPromotionById());
    };
  }, [location, slug, dispatch]);

  const [images, setImages] = useState("");

  const product = useSelector((state) => state.orebiReducer.idPromotion);
  console.log(product);

  useEffect(() => {
    if (product && !isLoading) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "MetaViewContent",
        eventCategory: "ViewContent",
        content_ids: [product.id], // ID del producto
        content_name: product.productName, // Nombre del producto
        content_type: "product", // Tipo de contenido
        value: product.price, // Valor del producto (precio)
        currency: "ARS", // Moneda, ajusta según sea necesario
      });
    }
  }, [product, isLoading]);

  const handleSelectedImages = (variantImgs) => {
    setImages(variantImgs);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={spinner} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <>
      {product ? (
        <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
          <div className="max-w-container mx-auto px-4 ">
            <div className="xl:-mt-10 -mt-7">
              <Breadcrumbs title="" prevLocation={prevLocation} />
            </div>
            <div className="flex flex-col justify-center lg:flex-row gap-4 lg:items-start ">
              <ImageDetail productInfo={product ? product : ""} />

              <PromotionInfo
                productInfo={product ? product : ""}
                handleSelectedImages={handleSelectedImages}
                discountedPrice={discountedPrice}
              />
            </div>
            <div className="flex justify-center py-20">
              <div className="my-4">
                {product.video_youtube ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.video_youtube,
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <BestSellers />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PromotionDetails;
