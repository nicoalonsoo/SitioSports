import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(48);
  const [sort, setSort] = useState("");

  const location = useLocation();
  const [searchTag, setSearchTag] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search") || "";
    setSearchTag(searchTerm);
  }, [location.search]);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleSort = (sort) => {
    setSort(sort);
  };
  const handleChangeSearchTag = () => {
    setSearchTag("");
  };
  return (
    <div className="max-w-container mx-auto px-4">
      {searchTag ? (
        <h1 className="pt-3 text-center text-semibold text-xl lg:text-3xl">
          Resultado de búsqueda: {searchTag}
        </h1>
      ) : (
        ""
      )}
      <Breadcrumbs title="" />
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner
            itemsPerPageFromBanner={itemsPerPageFromBanner}
            handleSort={handleSort}
          />
          <Pagination
            itemsPerPage={itemsPerPage}
            sort={sort}
            searchTag={searchTag}
            handleChangeSearchTag={handleChangeSearchTag}
          />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
