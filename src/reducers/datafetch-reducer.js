import { REQUEST_ALERTS, RECEIVE_ALERTS } from '../constants';
import { browserHistory } from 'react-router';

// this is the dashboard reducer, responds to all ACTIONS raised from the Dashboard page. 
export default function datafetchReducer(state = { alertsdata: [] }, action) {
  switch (action.type) {
    case REQUEST_ALERTS:

      console.log("REQUEST_ALERTS type of action called.");

      return state;
    case RECEIVE_ALERTS:
    
      console.log("RECEIVE_ALERTS type of action called.");

      // TODO, uncomment let alerts = action.payload;
      let alerts = action.payload.alertsdata;

      alerts.sort(function (alert1, alert2) {
        // Sort by count
        var dPriority = alert1.priority - alert2.priority;
        if (dPriority) return dPriority;

        // If there is a tie, sort by time
        var dTime = alert1.time - alert2.time;
        return dTime;
      });

      return {
        ...state,
        alertsdata: alerts
      };
    default:
      return state;
  }
};