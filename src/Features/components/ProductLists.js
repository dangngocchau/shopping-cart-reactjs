import { Grid } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import Product from './Product';
const ProductLists = ({ data }) => {
  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Box padding={1}>
              <Product product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductLists;
