import { Typography, makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import categoryApi from '../../../api/categoryApi';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  heading: {
    fontSize: '0.875rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.57rem',
    letterSpacing: 0.00714,
    fontWeight: '700',
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(2),
      fontWeight: 600,
      transition: 'all .25',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.dark,
      },
    },
  },
}));

const FilterByCategory = ({ onChange }) => {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        setCategoryList(
          response.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    console.log(category.id);
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.heading}>DANH MỤC SẢN PHẨM</Typography>
      <ul className={classes.menu}>
        {categoryList.map((c) => {
          return (
            <li key={c.id} onClick={() => handleCategoryClick(c)}>
              <Typography variant='body2'>{c.name}</Typography>
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default FilterByCategory;
