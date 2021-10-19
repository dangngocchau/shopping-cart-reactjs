import { Box } from '@mui/system';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_PALACEHOLDER } from '../../Constant/Common';

const ProductsThumnails = ({ product }) => {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : `${THUMBNAIL_PALACEHOLDER}`;
  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} width='100%' />
    </Box>
  );
};

export default ProductsThumnails;
