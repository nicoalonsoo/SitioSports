import React from "react";

const TallasBotines = ({ sizes, productSizes, handleSize, selectedSize }) => {

  const handleSizeSelection = (size) => {
    handleSize(size);
  };
  const groupedSizes = [];
  for (let i = 0; i < sizes.length; i += 5) {
    groupedSizes.push(sizes.slice(i, i + 5));
  }
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-5">
        {groupedSizes.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((size) => (
              <div key={size._id}>
               {productSizes && productSizes.includes && productSizes.includes(size.title) ? (
                  <div
                    className={`cursor-pointer border w-auto flex justify-center border-gray-300 overflow-hidden ${
                      selectedSize === size.title
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleSizeSelection(size.title)}
                  >
                    <div className="p-1 px-2">{size.title}</div>
                  </div>
                ) : (
                  <div
                    className={`bg-gray-100 text-gray-300 cursor-not-allowed line-through border w-auto flex justify-center border-gray-300 overflow-hidden`}
                  >
                    <div className="p-1 px-2">{size.title}</div>
                  </div>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TallasBotines;
