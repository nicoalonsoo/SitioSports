import React, { useState, useEffect } from "react";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { spinner } from "../../../assets/images";

function Items({
  currentItems,
  selectedBrands,
  selectedCategories,
  selectedSizes,
  selectedSubcategories,
  selectedTags,
  sort,
  searchTag,
  handleEmpty,
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
      selectedTags.some((selectedTag) => item.tags?.includes(selectedTag.title));

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

  return (
    <>
      {sortedItems.length === 0 ? (
        <div className="w-full">
          <h1 className="text-center text-gray-800 font-semibold text-lg lg:text-xl px-0">
            Tus parámetros de búsqueda no concuerdan con ninguno de nuestros
            productos, ¡sigue buscando!
          </h1>
        </div>
      ) : (
        sortedItems.map((item) => (
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

const Pagination = ({ itemsPerPage, commissions, sort, searchTag, handleChangeSearchTag }) => {
  const items = useSelector((state) => {
    if (commissions) {
      // Si es así, devolvemos los productos por encargo
      return state.orebiReducer.commissions;
    } else {
      // Si no, devolvemos todos los productos
      return state.orebiReducer.products;
    }
  }); // Filter items based on selected brands and categories

  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [empty, setEmpty] = useState(false);
  const [localSearchTag, setLocalSearchTag] = useState("");

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
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
  }
  useEffect(() => {
    if (searchTag) {
      setLocalSearchTag(searchTag)
    }
  }, [searchTag]);

  useEffect(() => {
    if (empty) {
      handleEmpty(false);
    }
    if (searchTag) {
      setLocalSearchTag("")
      handleSearchTag();
    }
  }, [
    selectedBrands,
    selectedCategories,
    selectedSubcategories,
    selectedSizes,
    selectedTags
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

  return (
    <div>
      {empty ? (
        <div className="w-full">
          <h1 className="text-center text-gray-800 font-semibold text-xl px-4 lg:px-20">
            Tus parámetros de busqueda no concuerdan con <br/>ninguno de nuestros
            productos, sigue buscando!
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mdl:gap-4 lg:gap-10">
          <Items
            currentItems={currentItems}
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
            selectedSizes={selectedSizes}
            selectedSubcategories={selectedSubcategories}
            selectedTags={selectedTags}
            sort={sort}
            searchTag={localSearchTag}
            handleEmpty={handleEmpty}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
