import { REQUEST_LOGIN, REQUEST_LOGIN_FAILED, REQUEST_USER_DATA, RECEIVE_USER_DATA } from '../constants';

// this is the HomePage reducer, responds to all ACTIONS raised from the HomePage page. 
export default function homepageReducer(state = { isLoggingIn: false }, action) {
  switch (action.type) {
    case REQUEST_LOGIN:

      console.log("REQUEST_LOGIN type of action called.");

      return {
        ...state,
        isLoggingIn: true
      };   
    case REQUEST_USER_DATA:

      console.log("REQUEST_USER_DATA type of action called.");

      return {
        ...state,
        isLoggingIn: false
      };
    case REQUEST_LOGIN_FAILED:

      console.log("REQUEST_LOGIN_FAILED type of action called.");

      return {
        ...state,
        isLoggingIn: false
      };
    default:
      return state;
  }
};