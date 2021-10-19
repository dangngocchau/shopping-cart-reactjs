import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import productApi from '../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductLists from '../components/ProductLists';
import ProductsFilter from '../components/ProductsFilter';
import ProductsSort from '../components/ProductsSort';
import SkeletonProducts from '../components/SkeletonProducts';
import queryString from 'query-string';

const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

const ListPages = () => {
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();
  // Chuỗi sau dấu ?
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    page: 1,
    total: 10,
  });
  const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState({
  //   ...queryParams,
  //   _limit: Number.parseInt(queryParams._limit) || 1,
  //   _page: Number.parseInt(queryParams._page) || 9,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // });
  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [filters, history]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('failed to fetch ', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    // setFilters((prev) => {
    //   return {
    //     ...prev,
    //     _page: page,
    //   };
    // });

    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    // setFilters((prev) => {
    //   return {
    //     ...prev,
    //     _sort: newSortValue,
    //   };
    // });

    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    // setFilters((prev) => {
    //   return {
    //     ...prev,
    //     ...newFilters,
    //   };
    // });

    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductsFilter
                filter={queryParams}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductsSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />
              <FilterViewer filter={queryParams} onChange={setNewFilters} />
              {loading ? (
                <SkeletonProducts length={9} />
              ) : (
                <ProductLists data={productList} />
              )}

              <Box className={classes.pagination}>
                <Pagination
                  color='primary'
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ListPages;
