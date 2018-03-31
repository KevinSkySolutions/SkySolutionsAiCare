import {
  REQUEST_ALERTS, RECEIVE_ALERTS
} from '../actions';

export default (state = {
  isLoggingIn: false,
  alerts: [],
  patients:[]
}, action) => {
  switch (action.type) {
    case REQUEST_ALERTS:
      return {
        ...state,
        isLoggingIn: true
      };
    case RECEIVE_ALERTS:
      return {
        ...state,
        isLoggingIn: false,
        // alerts: call a promise which resolves asynchronously - RxJs 
      };
    default:
      return state;
  }
};
