import { Badge, IconButton, makeStyles } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { cartItemsCountSelector } from '../Cart/Selector';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    color: 'white',
    backgroundColor: '#3f51b5',
  },
}));

export default function Header() {
  const classes = useStyles();

  const history = useHistory();

  const cartItemsCount = useSelector(cartItemsCountSelector);

  const handleCartClick = () => {
    history.push('/cart');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            H-Shop
          </Typography>
          <IconButton
            aria-label='show 4 new mails'
            color='inherit'
            onClick={handleCartClick}
          >
            <Badge badgeContent={cartItemsCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
