import { Box } from '@mui/system';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

const ProductsFilter = ({ filter, onChange }) => {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;

    const newFilter = {
      'category.id': newCategoryId,
    };

    onChange(newFilter);
  };
  const handlePriceChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };

  const handleServiceChange = (values) => {
    if (!onChange) return;
    onChange(values);
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handlePriceChange} />
      <FilterByService filter={filter} onChange={handleServiceChange} />
    </Box>
  );
};

export default ProductsFilter;
