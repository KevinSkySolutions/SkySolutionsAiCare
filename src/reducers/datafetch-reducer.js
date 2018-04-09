import { REQUEST_ALERTS, REQUEST_ALERTS_MOCK } from '../actions';
import { alertsData, patientsData, futureAlertsData } from './sampledata';

// this is the dashboard reducer, responds to all ACTIONS raised from the Dashboard page. 
export default function datafetchReducer(state = { alertsdata: []}, action) {
  switch (action.type) {
    case REQUEST_ALERTS:

      // TODO: API call to the backend to fetch data to return an asynchronous RxJs Observable
      // this can be a timed stream which will continuously update alerts during the lifecycle
      // of current user session (assuming server doesnt support push)

      console.log("REQUEST_ALERTS type of action called.");

      return {
        ...state,
        alertsdata: alertsData
      };
    case REQUEST_ALERTS_MOCK:

      // TODO: API call to the backend to fetch data to return an asynchronous RxJs Observable
      // this can be a timed stream which will continuously update alerts during the lifecycle
      // of current user session (assuming server doesnt support push)

      console.log("REQUEST_ALERTS_MOCK type of action called.");

      return {
        ...state,
        alertsdata: futureAlertsData
      };
    default:
      return state;
  }
};