import { REQUEST_LOGIN } from '../constants';

// this is the HomePage reducer, responds to all ACTIONS raised from the HomePage page. 
export default function homepageReducer(state = { isLoggingIn: false }, action) {
  switch (action.type) {
    case REQUEST_LOGIN:

      console.log("REQUEST_LOGIN type of action called.");

      return {
        ...state,
        isLoggingIn: true
      };

      // TODO: attempt login here asynchronously using RxJs and 
      //  respond with approriate state change on callback function      
    default:
      return state;
  }
};