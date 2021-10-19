import { Tab, Tabs } from '@material-ui/core';
import React from 'react';

const ProductsSort = ({ currentSort, onChange }) => {
  const handlerSortChange = (e, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Tabs
      value={currentSort}
      indicatorColor='primary'
      textColor='primary'
      onChange={handlerSortChange}
      aria-label='secondary tabs example'
    >
      <Tab label='Giá thấp tới cao' value='salePrice:ASC' />
      <Tab label='Giá cao xuống thấp' value='salePrice:DESC' />
    </Tabs>
  );
};

export default ProductsSort;
