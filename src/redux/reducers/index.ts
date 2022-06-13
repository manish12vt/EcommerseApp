import {combineReducers} from 'redux';
import {CartReducer} from './cartReducer';
import {ProductReducer} from './productReducer';
import {ThemeReducer} from './themeReducer';
import {LoginReducer} from './loginReducer';

const rootReducer = combineReducers({
  cartReducer: CartReducer,
  themeReducer: ThemeReducer,
  productReducer: ProductReducer,
  loginReducer:LoginReducer
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
