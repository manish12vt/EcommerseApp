import {ThemeState} from './../models/index';
import {ThemeAction} from '../actions/themeAction';

const initialState: ThemeState = {
  selectedTheme: 'light'
};

const ThemeReducer = (
  state: ThemeState = initialState,
  action: ThemeAction
) => {
  const {type, payload} = action;
  switch (type) {
    case 'ON_UPDATE_THEME':
      return {
        ...state,
        selectedTheme: payload
      };
    default:
      return state;
  }
};

export {ThemeReducer};
