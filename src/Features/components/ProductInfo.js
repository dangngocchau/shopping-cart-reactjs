import { makeStyles, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import { formatPrice } from '../../utils/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[300]} `,
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  salePrice: {
    fontSize: theme.typography.h4.fontSize,
    marginRight: theme.spacing(3),
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },
  priceBox: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
  },
}));

const ProductInfo = ({ product = {} }) => {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
    product;

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography component='h1' variant='h4'>
        {name}
      </Typography>
      <Typography variant='body2' className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component={'span'} className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component={'span'} className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component={'span'}>{`- ${promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductInfo;
