import { REQUEST_ALERTS_SUMMARY, SET_OVERLAY_EXPANSION, RESET_OVERLAY_EXPANSION } from '../constants';

const defaultState = {
  isExpanded:       false,
  summary:          [],
  highlightsummary: []
};
// this is the alerts overlay reducer, responds to all ACTIONS raised from the overlay part of every page. 
export default function alertsoverlayReducer(state = defaultState, action) {
  switch (action.type) {

    case REQUEST_ALERTS_SUMMARY:

      // alerts summary overlay is digested data
      // the intial values are 8 0s because we are assuming 8 levels of priority/type
      let alertsSummary = [0, 0, 0, 0, 0];
      let alertsHighlightsSummary = [0, 0, 0, 0, 0]
      let alertsData = action.payload;

      //Loop for counting the number of alerts for each type of alert
      for(var i = 0; i < alertsData.length; i++) { 
          var obj = alertsData[i].priority;
          
          alertsSummary[obj-1]++;//incrementing the corresponding entry in the array for that alert
          if (alertsData[i].isnew) {
            alertsHighlightsSummary[obj-1]++;
          }
      } 

      return {
        ...state,
        summary:          alertsSummary,
        highlightsummary: alertsHighlightsSummary
      };
    case SET_OVERLAY_EXPANSION:

      return {
        ...state,
        isExpanded: true
      };
    case RESET_OVERLAY_EXPANSION:

      return {
        ...state,
        isExpanded: false
      };
    default:
      return state;
  }
};