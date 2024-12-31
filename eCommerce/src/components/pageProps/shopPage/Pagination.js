import React, { useState, useEffect } from "react";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import ProductPromotion from "../../home/Products/ProductPromotion";
import { useLocation } from "react-router-dom";
function Items({
  itemOffset,
  currentItems,
  selectedBrands,
  selectedCategories,
  selectedSizes,
  selectedSubcategories,
  selectedTags,
  sort,
  searchTag,
  handleEmpty,
  itemsPerPage,
  handleShowButton,
}) {
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    if (searchTag) {
      const filtered = currentItems.filter((product) =>
        product.productName.toLowerCase().includes(searchTag.toLowerCase())
      );
      setSearchedProducts(filtered);
    } else {
      setSearchedProducts(currentItems);
    }
  }, [searchTag, currentItems]);

  const filteredItems = currentItems.filter((item) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => brand.title === item.brand);

    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.title === item.cat);

    const isSubcategorySelected =
      selectedSubcategories.length === 0 ||
      selectedSubcategories.some(
        (subcategory) => subcategory.title === item.sub_cat
      );

    const isSizeSelected =
      selectedSizes.length === 0 ||
      selectedSizes.some((selectedSize) =>
        item.variants.some((variant) =>
          variant.sizes.some(
            (size) => selectedSize.title === size.size && size.stock !== 0
          )
        )
      );

    const isTagSelected =
      selectedTags.length === 0 ||
      selectedTags.some((selectedTag) =>
        item.tags?.includes(selectedTag.title)
      );

    return (
      isBrandSelected &&
      isCategorySelected &&
      isSizeSelected &&
      isSubcategorySelected &&
      isTagSelected
    );
  });

  const sortedItems = (searchTag ? searchedProducts : filteredItems).sort(
    (a, b) => {
      if (sort === "price_asc") {
        return a.price - b.price;
      }
      if (sort === "price_desc") {
        return b.price - a.price;
      }
      if (sort === "popular") {
        return b.total_sales - a.total_sales;
      }
      if (sort === "novedades") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    }
  );

  useEffect(() => {
    if (sortedItems.length === 0) {
      handleEmpty(true);
    } else {
      handleEmpty(false);
    }
  }, [sortedItems, handleEmpty]);

  useEffect(() => {
    handleShowButton(sortedItems.length);
  }, [itemsPerPage, sortedItems]);

  const endOffset = itemOffset + itemsPerPage;
  const totalItems = sortedItems.slice(itemOffset, endOffset);

  return (
    <>
      {totalItems.length === 0 ? (
        <div className="w-full">
          <h1 className="text-center text-gray-800 font-semibold text-lg lg:text-xl px-0">
            Tus parámetros de búsqueda no concuerdan con ninguno de nuestros
            productos, ¡sigue buscando!
          </h1>
        </div>
      ) : (
        totalItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item.id}
              slug={item.slug}
              badge={item.badge}
              img={item.variants[0].imgUrl[0]}
              productName={item.productName}
              price={item.price}
              compare_price={item.compare_price}
              brand={item.brand}
              cat={item.cat}
              sub_cat={item.sub_cat}
              sizes={item.sizes}
              variants={item.variants}
              description={item.description}
              color={item.color}
              discount={item.discount_percentage}
              video_youtube={item.video_youtube}
            />
          </div>
        ))
      )}
    </>
  );
}

function ItemsPromotions({ items, currentItems, promotions }) {
  console.log(items);

  return (
    <>
      {items.length === 0 ? (
        <div className="w-full">
          <h1 className="text-center text-gray-800 font-semibold text-lg lg:text-xl px-0">
            Tus parámetros de búsqueda no concuerdan con ninguno de nuestros
            productos, ¡sigue buscando!
          </h1>
        </div>
      ) : (
        items.map((item) => (
          <div key={item._id} className="w-full">
            <ProductPromotion
              _id={item.id}
              slug={item.slug}
              title={item.title}
              description={item.description}
              img={item.img}
              type={item.type}
              endDate={item.endDate}
              categories={item.categories ? item.categories : ""}
              giftCategory={item.giftCategory ? item.giftCategory : ""}
            />
          </div>
        ))
      )}
    </>
  );
}

const Pagination = ({
  commissions,
  sort,
  searchTag,
  handleChangeSearchTag,
}) => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const queryParams = new URLSearchParams(location.search); // Parsear query string
  const promotionQuery = queryParams.get("promociones"); // Obtener valor de 'promocion'
  const promotions = promotionQuery === "ss"; // Verificar si 'promocion=ss'
  const items = useSelector((state) => {
    if (commissions) {
      // Si es así, devolvemos los productos por encargo
      return state.orebiReducer.commissions;
    } else if (promotions) {
      // Si es así, devolvemos las promociones
      return state.orebiReducer.promotions;
    } else {
      // Si no, devolvemos todos los productos
      return state.orebiReducer.products;
    }
  }); // Filter items based on selected brands and categories
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [empty, setEmpty] = useState(false);
  const [localSearchTag, setLocalSearchTag] = useState("");
console.log(items, "items");

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items;
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const selectedSubcategories = useSelector(
    (state) => state.orebiReducer.checkedSubcategorys
  );
  const selectedSizes = useSelector((state) => state.orebiReducer.checkedSizes);
  const selectedTags = useSelector((state) => state.orebiReducer.checkedTags);

  const handleSearchTag = () => {
    handleChangeSearchTag();
  };
  useEffect(() => {
    if (searchTag) {
      setLocalSearchTag(searchTag);
    }
  }, [searchTag]);

  useEffect(() => {
    if (empty) {
      handleEmpty(false);
    }
    if (searchTag) {
      setLocalSearchTag("");
      handleSearchTag();
    }
  }, [
    selectedBrands,
    selectedCategories,
    selectedSubcategories,
    selectedSizes,
    selectedTags,
  ]);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    const newStart = newOffset + 1; // Adjust the start index

    setItemOffset(newOffset);
    setItemStart(newStart);
  };
  const handleEmpty = (value) => {
    setEmpty(value);
  };
  const loadMoreItems = () => {
    setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 4); // Añadir 4 más cada vez
    handleShowButton();
  };
  const [showButton, setShowButton] = useState(false);
  const handleShowButton = (value) => {
    if (value < itemsPerPage) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };
  return (
    <div>
      {empty ? (
        <div className="w-full">
          <h1 className="text-center text-gray-800 font-semibold text-xl px-4 lg:px-20">
            Tus parámetros de busqueda no concuerdan con <br />
            ninguno de nuestros productos, sigue buscando!
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mdl:gap-4 lg:gap-10">
          {promotions ? (
            <ItemsPromotions
             items={items}
              currentItems={currentItems.promotion}
              selectedBrands={selectedBrands}
              selectedCategories={selectedCategories}
              selectedSizes={selectedSizes}
              selectedSubcategories={selectedSubcategories}
              selectedTags={selectedTags}
              sort={sort}
              searchTag={localSearchTag}
              handleEmpty={handleEmpty}
              itemsPerPage={itemsPerPage}
              handleShowButton={handleShowButton}
              promotions={promotions}
            />
          ) : (
            <Items
              itemOffset={itemOffset}
              currentItems={currentItems}
              selectedBrands={selectedBrands}
              selectedCategories={selectedCategories}
              selectedSizes={selectedSizes}
              selectedSubcategories={selectedSubcategories}
              selectedTags={selectedTags}
              sort={sort}
              searchTag={localSearchTag}
              handleEmpty={handleEmpty}
              itemsPerPage={itemsPerPage}
              handleShowButton={handleShowButton}
            />
          )}
        </div>
      )}
      {/* Botón "Cargar más" */}
      {showButton && (
        <div className="flex justify-center mt-10">
          <button
            className="px-4 py-2 bg-pink-500 text-white rounded-md"
            onClick={loadMoreItems}
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
