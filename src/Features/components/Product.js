import { makeStyles, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';
import { STATIC_HOST, THUMBNAIL_PALACEHOLDER } from '../../Constant/Common';
import { formatPrice } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
}));

const Product = ({ product }) => {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : `${THUMBNAIL_PALACEHOLDER}`;

  const classes = useStyles();

  const history = useHistory();

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };

  return (
    <Box className={classes.root} padding={1} onClick={handleClick}>
      <Box padding={1} minHeight='215px'>
        <img src={thumbnailUrl} alt={product.name} width='100%' />
      </Box>
      <Typography variant='body2'>{product.name}</Typography>
      <Typography variant='body2'>
        <Box component='span' fontSize='16px' fontWeight='bold' marginRight={1}>
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
};

export default Product;
