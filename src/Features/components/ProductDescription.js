import { Paper } from '@material-ui/core';
import React from 'react';
import DOMPurify from 'dompurify';

const ProductDescription = ({ product }) => {
  const safeDesc = DOMPurify.sanitize(product.description);

  return (
    <Paper elevation={0} style={{ padding: '15px' }}>
      <div dangerouslySetInnerHTML={{ __html: safeDesc }}></div>
    </Paper>
  );
};

export default ProductDescription;
