import { REQUEST_ALERTS_SUMMARY, REQUEST_ALERTS_SUMMARY_MOCK } from '../actions';
import { alertsData, futureAlertsData } from './sampledata';

// this is the alerts overlay reducer, responds to all ACTIONS raised from the overlay part of
// every page. 
export default function alertsoverlayReducer(state = { alertsdata: []}, action) {
  switch (action.type) {
    case REQUEST_ALERTS_SUMMARY:

    	// alerts summary overlay is digested data

     	console.log("REQUEST_ALERTS type of action called.");

      	return {
	        ...state,
	        alertsdata: alertsData
      	};
    case REQUEST_ALERTS_SUMMARY_MOCK:

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