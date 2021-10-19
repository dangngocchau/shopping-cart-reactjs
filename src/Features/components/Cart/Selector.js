import { createSelector } from 'reselect';

const cartItemsSelector = (state) => state.cart.cartItems;

// Count number product

export const cartItemsCountSelector = createSelector(
  cartItemsSelector,
  (cartItems) => cartItems.reduce((total, item) => total + item.quantity, 0)
);
export const cartItemsTotalSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems.reduce(
      (total, item) => total + item.product.salePrice * item.quantity,
      0
    )
);
