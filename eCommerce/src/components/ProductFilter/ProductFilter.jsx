import React from 'react';

const ProductFilter = ({ filters, handleProductFilter }) => {
  return (
    <div className="flex items-center space-x-2">
      {Object.keys(filters).map((filter) => (
        <label key={filter} className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={filters[filter]}
            onChange={(e) => handleProductFilter(filter, e.target.checked)}
          />
          <span>{filter}</span>
        </label>
      ))}
    </div>
  );
};

export default ProductFilter;
