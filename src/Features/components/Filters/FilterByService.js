import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';

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
  list: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      margin: 0,
      marginTop: theme.spacing(1),
    },
  },
}));

const FilterByService = ({ onChange, filter = {} }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.heading}>DỊCH VỤ</Typography>
      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'Có khuyến mãi' },
          { value: 'isFreeShip', label: 'Vẫn chuyển miễn phí' },
        ].map((service) => {
          return (
            <li key={service.value}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(filter[service.value])}
                    name={service.value}
                    onChange={handleChange}
                    color='primary'
                  />
                }
              />
              {service.label}
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default FilterByService;
