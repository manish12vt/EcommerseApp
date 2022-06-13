import {Dispatch} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

export interface UpdateThemeAction {
  readonly type: 'ON_UPDATE_THEME';
  payload: Theme;
}

export type ThemeAction = UpdateThemeAction;

export const onUpdateTheme = (theme: Theme) => {
  return async (dispatch: Dispatch<ThemeAction>) => {
    try {
      await AsyncStorage.setItem('user_theme', theme);
      dispatch({
        type: 'ON_UPDATE_THEME',
        payload: theme
      });
    } catch (error) {
      console.log(error);
    }
  };
};
