import {Product, ProductState, ProductTiming, HotDeal} from './../models/index';
import {ProductAction} from '../actions';

const initialState = {
  products: {} as [Product],
  productTimings: {} as [ProductTiming],
  hotDeals: {} as [HotDeal],
  error: ''
};

const ProductReducer = (
  state: ProductState = initialState,
  action: ProductAction
) => {
  switch (action.type) {
    case 'PRODUCT_FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload
      };
    case 'PRODUCT_TIMING_FETCH_SUCCESS':
      return {
        ...state,
        productTimings: action.payload
      };
    case 'HOT_DEALS_FETCH_SUCCESS':
      return {
        ...state,
        hotDeals: action.payload
      };
    case 'PRODUCT_FETCH_ERROR':
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export {ProductReducer};
