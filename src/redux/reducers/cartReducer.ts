import {Product, CartState} from './../models/index';
import {CartAction} from '../actions';

const initialState: CartState = {
  cart: {} as [Product]
};

const CartReducer = (state: CartState = initialState, action: CartAction) => {
  const {type, payload} = action;

  switch (type) {
    case 'ON_ADD_ITEM':
      if (!Array.isArray(state.cart)) {
        payload.quantity = 1;
        return {
          ...state,
          cart: [payload]
        };
      }

      const existingProduct = state.cart.find(
        item => item.id == action.payload.id
      );

      if (existingProduct) {
        let updatedCart = state.cart.map((product:any) => {
          if (product.id == action.payload.id) {
            product.quantity = product.quantity + 1;
          }
          return product;
        });

        return {
          ...state,
          cart: updatedCart
        };
      } else {
        // Add to cart if not added
        payload.quantity = 1;
        return {
          ...state,
          cart: [...state.cart, action.payload]
        };
      }

    case 'ON_REMOVE_ITEM':
      const updatedProducts = state.cart.filter(
        item => item.id !== action.payload
      );
      console.log("itemrrrrr=>",updatedProducts);

      return {
        ...state,
        cart: updatedProducts
      };

    case 'ON_RESET_BASKET':
      const reset = action.payload;
      console.log("hello99----->",reset);
      
      return {
        ...state,
        cart: reset
      };
    case 'ON_UPDATE_CART':
      return {
        ...state,
        cart: payload
      };

    case 'ON_REDUCE_QUANTITY':
      let updatedCart = state.cart.map((product:any) => {
        if (product.id === action.payload) {
          product.quantity = product.quantity - 1;
        }
        return product;
      });

      return {
        ...state,
        cart: updatedCart
      };

    default:
      return state;
  }
};

export {CartReducer};
