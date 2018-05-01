import { REQUEST_ALERTS, RECEIVE_ALERTS, REQUEST_SEARCH } from '../constants';
import { browserHistory } from 'react-router';
import { annotateWithSearchData, filterAlertsWithKeyword } from '../constants/Utilities';

// this is the dashboard reducer, responds to all ACTIONS raised from the Dashboard page. 
const defaultState = { alertsdata: [], searchresults: [] };

export default function datafetchReducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_ALERTS:

      return state;
    case RECEIVE_ALERTS:

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

      let returnAlerts = annotateWithSearchData(alerts);

      return {
        ...state,
        alertsdata: returnAlerts
      };
    case REQUEST_SEARCH:
      
      let keyword = action.payload;
      // keyword is invalid case
      if ((keyword == undefined) || (keyword.length < 3)) {   
        return {
          ...state,
          searchresults: []
        };
      } 
      // keyword is valid, so proceed with search
      else {
        let searchResults = filterAlertsWithKeyword(state.alertsdata, keyword);
        return {
          ...state,
          searchresults: searchResults
        };
      }
    default:
      return state;
  }
};