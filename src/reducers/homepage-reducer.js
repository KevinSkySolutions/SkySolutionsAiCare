import { REQUEST_LOGIN, REQUEST_LOGIN_FAILED, REQUEST_USER_DATA, RECEIVE_USER_DATA } from '../constants';

// this is the HomePage reducer, responds to all ACTIONS raised from the HomePage page. 
export default function homepageReducer(state = { isLoggingIn: false }, action) {
  switch (action.type) {
    case REQUEST_LOGIN:

      return {
        ...state,
        isLoggingIn: true
      };   
    case REQUEST_USER_DATA:

      return {
        ...state,
        isLoggingIn: false
      };
    case REQUEST_LOGIN_FAILED:

      return {
        ...state,
        isLoggingIn: false
      };
    default:
      return state;
  }
};