import {
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import useProductDetails from '../../hooks/useProductDetail';
import AddToCart from '../components/AddToCart';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReview from '../components/ProductReview';
import ProductsThumnails from '../components/ProductsThumnails';
import { useDispatch } from 'react-redux';
import { addToCart } from '../components/Cart/CartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading: {
    position: 'fix',
    top: 0,
    left: 0,
    with: '100%',
  },
}));

const DetailPage = () => {
  const classes = useStyles();

  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetails(productId);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    dispatch(addToCart({ id: product.id, product, quantity }));
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductsThumnails product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCart onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`} exact>
            <ProductAdditional />
          </Route>
          <Route path={`${url}/reviews`} exact>
            <ProductReview />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
};

export default DetailPage;
