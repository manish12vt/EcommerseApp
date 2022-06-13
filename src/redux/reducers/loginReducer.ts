import {LoginState} from './../models/index';
import {loginActions} from '../actions/loginActions';

const initialState: LoginState = {
  activeLogin: {} as [LoginState],
};

const LoginReducer = (
  state: LoginState = initialState,
  action: loginActions
) => {
  const {type, payload} = action;
  switch (type) {
    case 'ON_LOGIN':
        console.log("payload===============>",payload);
        
      return {
        ...state,
        activeLogin: payload
      };
    default:
      return state;
  }
};

export {LoginReducer};
