import React, { useState, useEffect } from "react";
import UploadImage from "../../components/UploadImage/UploadImage";
import PostSizeBotines from "../../components/ProductForm/PostSizeBotines";
import PostSizeCamisetas from "../../components/ProductForm/PostSizeCamisetas";
import PostSizeMedias from "../../components/ProductForm/PostSizeMedias";
import PostAccesorios from "../../components/ProductForm/PostAccesorios";
import PostSizeZapatillas from "../../components/ProductForm/PostSizeZapatillas";
import { IoIosArrowDown } from "react-icons/io";

const Variant = ({
  handleChangeVariantImg,
  handleDeleteImage,
  handleChangeVariantName,
  handleDeleteVariant,
  cat,
  sub_cat,
  vari,
  handleSizes,
  variants,
}) => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  useEffect(() => {
    if (cat) {
      setCategory(cat);
    }
    if (sub_cat) {
      setSubCategory(sub_cat);
    }
  }, [cat, sub_cat]);

  const [uploadImg, setUploadImg] = useState(false);

  const handleCloseUpload = () => {
    setUploadImg(false);
  };

  return (
    <div className="">
      <div
        className="bg-red-500 w-10 text-white text center text-xl flex justify-center cursor-pointer"
        onClick={() => handleDeleteVariant(vari.id)}
      >
        -
      </div>
      <input
        type="text"
        name="variant"
        id="variant"
        onChange={(e) => handleChangeVariantName(vari.id, e.target.value)}
        value={vari.variant}
        autocomplete="brand"
        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        placeholder="variant"
      />
      <div className="flex">
        {vari.imgUrl
          ? vari.imgUrl?.map((img, index) => (
              <div key={index} className="w-24 relative">
                <img className="" src={img} />
                <div
                  onClick={() => handleDeleteImage(index, vari.id)}
                  className="absolute top-0 right-0 cursor-pointer opacity-70 hover:opacity-100"
                >
                  X
                </div>
              </div>
            ))
          : ""}
      </div>
      <div
        onClick={() => setUploadImg(!uploadImg)}
        className="w-1/5 flex items-center justify-center underline cursor-pointer "
      >
        <p className="w-">Cargar imagen</p>
        <IoIosArrowDown className={`${uploadImg ? "rotate-180" : ""} duration-300`} />
      </div>
      {uploadImg && (
        <UploadImage
          handleUploadImageVariant={handleChangeVariantImg}
          id={vari.id}
          handleCloseUpload={handleCloseUpload}
        />
      )}
      {category === "Botines" && (
        <PostSizeBotines
          id={vari.id}
          handleSizes={handleSizes}
          variants={variants}
        />
      )}
      {category === "Zapatillas" && (
        <PostSizeZapatillas
          id={vari.id}
          handleSizes={handleSizes}
          variants={variants}
          cat={category}
          sub_cat={subCategory}
        />
      )}
      {category === "Camisetas" && (
        <PostSizeCamisetas
          id={vari.id}
          handleSizes={handleSizes}
          variants={variants}
        />
      )}
      {category === "Indumentaria" && (
        <PostSizeCamisetas
          id={vari.id}
          handleSizes={handleSizes}
          variants={variants}
        />
      )}
      {category === "Medias" && (
        <PostSizeMedias
          id={vari.id}
          handleSizes={handleSizes}
          variants={variants}
        />
      )}
      {category === "Accesorios" ? (
        // subCategory === "Termo" ? (
          <PostAccesorios
            id={vari.id}
            handleSizes={handleSizes}
            variants={variants}
            cat={category}
            sub_cat={subCategory}
          />
        // ) : (
        //   <PostSizeMedias
        //     id={vari.id}
        //     handleSizes={handleSizes}
        //     variants={variants}
        //   />
        // )
      ) : null}
    </div>
  );
};

export default Variant;
