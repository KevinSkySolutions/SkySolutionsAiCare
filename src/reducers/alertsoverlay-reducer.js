import { REQUEST_ALERTS_SUMMARY } from '../constants';
// this is the alerts overlay reducer, responds to all ACTIONS raised from the overlay part of every page. 
export default function alertsoverlayReducer(state = { isExpanded: false, summary: [] }, action) {
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
    default:
      return state;
  }
};