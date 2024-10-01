import React, { useState, useEffect } from "react";

const SizesForm = ({ handleSizes, selectedSizes, cat,  }) => {
  const [sizes, setSizes] = useState([
    "39",
    "39.5",
    "40",
    "40.5",
    "41",
    "41.5",
    "42",
    "42.5",
    "43",
    "43.5",
    "44",
    "44.5",
    "45",
  ]);


  const handleSizeSelection = (size) => {
    handleSizes(size);
  };

  const groupedSizes = [];
  for (let i = 0; i < sizes.length; i += 5) {
    groupedSizes.push(sizes.slice(i, i + 5));
  }
  return (
    <div className="overflow-x-auto">
      Talles
      <div className="grid grid-cols-5">
        {groupedSizes.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((size) => (
              <div
                key={size}
                className={`cursor-pointer border w-auto flex justify-center border-gray-300  overflow-hidden ${
                  selectedSizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
                onClick={() => handleSizeSelection(size)}
              >
                <div className="p-1 px-2 ">{size}</div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SizesForm;
