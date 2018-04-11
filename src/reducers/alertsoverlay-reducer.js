import { REQUEST_ALERTS_SUMMARY } from '../constants';
import { alertsData, futureAlertsData } from './sampledata';

// this is the alerts overlay reducer, responds to all ACTIONS raised from the overlay part of
// every page. 

export default function alertsoverlayReducer(state = {
  isExpanded: false,
  summary: [],
}, action) {
  switch (action.type) {
    case REQUEST_ALERTS_SUMMARY:

      // alerts summary overlay is digested data
      console.log("OVERLAY DATA:");

      // the intial values are 8 0s because we are assuming 8 levels of priority/type
      let overlayCount=[0,0,0,0,0,0,0,0];

      //Loop for counting the number of alerts for each type of alert
      for(var i = 0; i < alertsData.length; i++) { 
          var obj = alertsData[i].priority;
          
          overlayCount[obj-1]++;//incrementing the corresponding entry in the array for that alert

          console.log(obj);
          console.log(overlayCount);
      } 

      console.log("REQUEST_ALERTS_SUMMARY type of action called.");
       
      return {
        ...state,
        summary: overlayCount
      };
    default:
      return state;
  }
};