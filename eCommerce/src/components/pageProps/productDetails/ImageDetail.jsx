import React from "react";

import compressImage from "../../../utils/compressImage";

const ImageDetail = ({ productInfo }) => {
  return (
    <>
      {productInfo ? (
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <img
            src={compressImage(productInfo.img)}
            alt={`Promotion Image`}
            className="hidden lg:block w-full h-full object-cover rounded-xl"
          />

          <div className="block lg:hidden pt-0 pb-8 lg:py-8 w-[100%]">
            <div className="px-2">
              <div className="w-auto flex flex-wrap justify-center items-start gap-4 rounded-xl overflow-hidden">
                <img src={productInfo.img} alt="img_before" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ImageDetail;
