import { Button, TextField, Typography, makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[400]}`,
  },
  heading: {
    fontSize: '0.875rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.57rem',
    letterSpacing: 0.00714,
    fontWeight: '700',
  },
  buttonPrice: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',

    '& > button': {
      padding: '0 10px',
      height: '40px',
      width: '90px',
    },
  },
  range: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexFlow: ' no nowrap',
    alignItems: 'center',

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

const FilterByPrice = ({ onChange }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    onChange(values);
  };
  const handleReset = () => {
    setValues({ salePrice_gte: 0, salePrice_lte: 0 });
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.heading}>CHỌN KHOẢNG GIÁ</Typography>
      <Box className={classes.range}>
        <TextField
          name='salePrice_gte'
          value={values.salePrice_gte}
          onChange={handleChange}
        ></TextField>
        <span>-</span>
        <TextField
          name='salePrice_lte'
          value={values.salePrice_lte}
          onChange={handleChange}
        ></TextField>
      </Box>
      <Box className={classes.buttonPrice}>
        <Button variant='outlined' color='primary' onClick={handleSubmit}>
          Áp dụng
        </Button>
        <Button variant='outlined' color='primary' onClick={handleReset}>
          RESET
        </Button>
      </Box>
    </Box>
  );
};

export default FilterByPrice;
