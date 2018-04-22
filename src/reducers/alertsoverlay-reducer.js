import { REQUEST_ALERTS_SUMMARY, SET_OVERLAY_EXPANSION, RESET_OVERLAY_EXPANSION } from '../constants';

const defaultState = {
  isExpanded: false,
  summary:    []
};
// this is the alerts overlay reducer, responds to all ACTIONS raised from the overlay part of every page. 
export default function alertsoverlayReducer(state = defaultState, action) {
  switch (action.type) {

    case REQUEST_ALERTS_SUMMARY:

      console.log("REQUEST_ALERTS_SUMMARY type of action called.");

      // alerts summary overlay is digested data
      // the intial values are 8 0s because we are assuming 8 levels of priority/type
      let alertsSummary = [0,0,0,0,0];
      let alertsData = action.payload;

      //Loop for counting the number of alerts for each type of alert
      for(var i = 0; i < alertsData.length; i++) { 
          var obj = alertsData[i].priority;
          
          alertsSummary[obj-1]++;//incrementing the corresponding entry in the array for that alert
      } 

      return {
        ...state,
        summary: alertsSummary
      };
    case SET_OVERLAY_EXPANSION:

      console.log("SET_OVERLAY_EXPANSION type of action called.");

      return {
        ...state,
        isExpanded: true
      };
    case RESET_OVERLAY_EXPANSION:

      console.log("RESET_OVERLAY_EXPANSION type of action called.");

      return {
        ...state,
        isExpanded: false
      };
    default:
      return state;
  }
};