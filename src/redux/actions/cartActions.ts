import {Product} from '../models/index';
import {Dispatch} from 'react';
import {Notifier, NotifierComponents} from 'react-native-notifier';

export interface AddItemAction {
  readonly type: 'ON_ADD_ITEM';
  payload: Product;
}

export interface RemoveItemAction {
  readonly type: 'ON_REMOVE_ITEM';
  payload: string;
}

export interface ResetBasketAction {
  readonly type: 'ON_RESET_BASKET';
  payload: any
}
export interface ReduceQuantityAction {
  readonly type: 'ON_REDUCE_QUANTITY';
  payload: string;
}
export interface UpdateCartAction {
  readonly type: 'ON_UPDATE_CART';
  payload: [Product];
}

export type CartAction =
  | AddItemAction
  | RemoveItemAction
  | ResetBasketAction
  | ReduceQuantityAction
  | UpdateCartAction;

export const onAddItem = (item: Product) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_ADD_ITEM',
      payload: item
    });
    Notifier.showNotification({
      title: 'Success',
      description: item.name + ' added to basket',
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'success'
      }
    });
  };
};

export const onRemoveItem = (id: string) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_REMOVE_ITEM',
      payload: id
    });
  };
};

export const onResetBasket = (data: any) => {
  console.log("data=====>",data);
  
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_RESET_BASKET',
      payload: data
    });
  };
};

export const onReduceQuantity = (id: string) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_REDUCE_QUANTITY',
      payload: id
    });
  };
};

export const updateCart = (list: [Product]) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({
      type: 'ON_UPDATE_CART',
      payload: list
    });
  };
};
