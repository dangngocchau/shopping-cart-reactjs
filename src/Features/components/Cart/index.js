import React from 'react';
import { useSelector } from 'react-redux';
import { cartItemsTotalSelector } from './Selector';

const CartFeature = () => {
  const cartTotal = useSelector(cartItemsTotalSelector);

  return <div>Cart {cartTotal}</div>;
};

export default CartFeature;
