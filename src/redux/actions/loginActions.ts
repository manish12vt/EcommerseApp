import {Dispatch} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';



export interface login {
  readonly type: 'ON_LOGIN';
  payload: any ;
}

export type loginActions = login;

export const onLogin = (data: any) => {
    
  return async (dispatch: Dispatch<loginActions>) => {
    try {
      await AsyncStorage.setItem('activeLogin', data.toString());
      dispatch({
        type: 'ON_LOGIN',
        payload: data
      });
    } catch (error) {
      console.log("Error is good",error);
    }
  };
};
