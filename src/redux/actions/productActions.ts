import {HotDeal, Product, ProductTiming} from './../models/index';
import axios from 'axios';
import {Dispatch} from 'react';
import API from '../../API/API';

export interface GetProductAction {
  readonly type: 'PRODUCT_FETCH_SUCCESS';
  payload: Product;
}

export interface GetProductTimingAction {
  readonly type: 'PRODUCT_TIMING_FETCH_SUCCESS';
  payload: ProductTiming;
}

export interface GetHotDealsAction {
  readonly type: 'HOT_DEALS_FETCH_SUCCESS';
  payload: any;
}

export interface ProductErrorAction {
  readonly type: 'PRODUCT_FETCH_ERROR';
  payload: any;
}

export type ProductAction =
  | GetProductAction
  | GetProductTimingAction
  | GetHotDealsAction
  | ProductErrorAction;

export const getProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await axios.get<Product>(API.getProducts);

      if (!response) {
        dispatch({
          type: 'PRODUCT_FETCH_ERROR',
          payload: 'Error while fetching products'
        });
      } else {
        dispatch({
          type: 'PRODUCT_FETCH_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      console.log(error, 'getProducts');

      dispatch({
        type: 'PRODUCT_FETCH_ERROR',
        payload: error
      });
      throw error;
    }
  };
};

export const getProductTiming = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await axios.get<ProductTiming>(API.getProductTimings);

      if (!response) {
        dispatch({
          type: 'PRODUCT_FETCH_ERROR',
          payload: 'Error while fetching product timing'
        });
      } else {
        dispatch({
          type: 'PRODUCT_TIMING_FETCH_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      console.log(error, 'getProductTiming');
      dispatch({
        type: 'PRODUCT_FETCH_ERROR',
        payload: error
      });
      throw error;
    }
  };
};

export const getHotDeals = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await axios.get<HotDeal>(API.getHotDeals);

      if (!response) {
        dispatch({
          type: 'PRODUCT_FETCH_ERROR',
          payload: 'Error while fetching hot deals'
        });
      } else {
        dispatch({
          type: 'HOT_DEALS_FETCH_SUCCESS',
          payload: response.data
        });
      }
    } catch (error) {
      console.log(error, 'getHotDeals');

      dispatch({
        type: 'PRODUCT_FETCH_ERROR',
        payload: error
      });
      throw error;
    }
  };
};
