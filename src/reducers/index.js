import { combineReducers } from 'redux';

import { REQUEST_LOGIN, REQUEST_ALERTS } from '../actions';

const rootReducer = combineReducers({ 
  homepage:  homepageReducer,
  dashboard: dashboardReducer
});

export default rootReducer;

// this is the HomePage reducer, responds to all ACTIONS raised from the HomePage page. 
function homepageReducer(state = { isLoggingIn: false }, {type, payload}) {
  switch (type) {
    case REQUEST_LOGIN:

      console.log("REQUEST_LOGIN type of action called.");
      // TODO: attempt login here asynchronously and 
      //  respond with approriate state change on callback function

      return {
        ...state,
        isLoggingIn: true
      };
    default:
      return state;
  }
};

// this is the dashboard reducer, responds to all ACTIONS raised from the Dashboard page. 
function dashboardReducer(state = { alertsdata: []}, {type, payload}) {
  switch (type) {
    case REQUEST_ALERTS:

      // TODO: API call to the backend to fetch data to return an asynchronous RxJs Observable
      // this can be a timed stream which will continuously update alerts during the lifecycle
      // of current user session (assuming server doesnt support push)

      console.log("REQUEST_ALERTS type of action called.");

      return {
        ...state,
        isLoggingIn: false
      };
    default:
      return state;
  }
};


