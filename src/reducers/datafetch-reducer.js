import { REQUEST_ALERTS, 
         RECEIVE_ALERTS, 
         REQUEST_SEARCH, 
         UPDATE_ALERT_DATA, 
         REQUEST_RESIDENTS_DATA, 
         RECEIVE_RESIDENTS_DATA,
         REQUEST_FLOOR_DATA, 
         RECEIVE_FLOOR_DATA, 
         DIGEST_FLOOR_DATA, 
         SELECT_FLOOR, 
         SET_ALERT_EXPANSION, 
         RESET_ALERT_EXPANSION, 
         NAVIGATE_TO_ALERT,
         REQUEST_ALERTS_SUMMARY, 
         SET_OVERLAY_EXPANSION, 
         RESET_OVERLAY_EXPANSION,
         REQUEST_LOGIN, 
         REQUEST_LOGIN_FAILED, 
         REQUEST_USER_DATA, 
         RECEIVE_USER_DATA,
         REQUEST_FLOOR_API_DATA,
         REQUEST_ENTERPRISE_DATA,
         REQUEST_VENUE_DATA,
         REQUEST_SENSOR_ALERT_DATA,
         REQUEST_BUILDING_DATA,
         RECEIVE_FLOOR_API_DATA,
         RECEIVE_ENTERPRISE_DATA,
         RECEIVE_VENUE_DATA,
         RECEIVE_BUILDING_DATA,
         RECEIVE_SENSOR_ALERT_DATA  } from '../constants';

import { browserHistory } from 'react-router';
import { annotateWithSearchData, filterAlertsWithKeyword } from '../constants/Utilities';

// this is the dashboard reducer, responds to all ACTIONS raised from the Dashboard page. 
const defaultState = { alertsdata: [], searchresults: [], residentsdata: [], selection: {
        selectedalert: -1,   // this indicates which of the alerts is expanded currently
        floormap: {}, 
        floor: 1,   
        alerts: []
    }, 
    floors: [],
    isExpanded:       false,
    summary:          [],
    highlightsummary: [],
    isLoggingIn: false,
    userdata: {},
    buildingdata: {},
    floorAPIdata: [],
    enterprisedata: {},
    venuedata: {},
    sensoralertdata: [] };

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

      return {
        ...state,
        alertsdata: alerts
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
    

      case RECEIVE_RESIDENTS_DATA:
        let residents = action.payload;

        return {
          ...state,
          residentsdata: residents

        }
      case RECEIVE_FLOOR_DATA:

          let floorsData = action.payload;

          //Defining a temporary floor object for data manipulation
          let selection_obj = JSON.parse(JSON.stringify(state.selection));
          selection_obj.floor = floorsData.defaultfloor;

          //Loop for selecting the appropriate floormap with respect to the selected floor
          for (var i = 0; i < floorsData.length; i++) {
              if (floorsData[i].floor == selection_obj.floor) {
                  selection_obj.floormap = floorsData[i].floormap;
              }
          };

          return {
              ...state,
              selection: selection_obj,
              floors: floorsData.details
          };
      case DIGEST_FLOOR_DATA:

          //Defining a temporary floor object for data manipulation
          let floor_obj = JSON.parse(JSON.stringify(state.selection));
          let alertsdata = action.payload;

          //Loop for selecting the appropriate alerts with respect to the selected floor
          floor_obj.alerts = [];
          for (var i = 0; i < alertsdata.length; i++) {
              if (alertsdata[i].floor == floor_obj.floor) {
                  floor_obj.alerts.push(alertsdata[i]);
              }
          };

          return {
              ...state,
              selection: floor_obj
          };
      case SELECT_FLOOR:

          let floor_to_set = action.payload.floornumber;
          let alerts_change = action.payload.alertsdata;

          alerts_change.sort(function (alert1, alert2) {
              // Sort by count
              var dPriority = alert1.priority - alert2.priority;
              if (dPriority) return dPriority;

              // If there is a tie, sort by time
              var dTime = alert1.time - alert2.time;
              return dTime;
          });

          //Defining a temporary floor object for data manipulation
          let selection_object = JSON.parse(JSON.stringify(state.selection));
          selection_object.floor = floor_to_set; //assigning the selected floor to the temporary object from the payload of the action
          let floorsDatas = state.floors;


          //Loop for selecting the appropriate floormap with respect to the selected floor
          for (var i = 0; i < floorsDatas.length; i++) {
              if (floorsDatas[i].floor == selection_object.floor) {
                  selection_object.floormap = floorsDatas[i].floormap;
              }
          };

          //Loop for selecting the appropriate alerts with respect to the selected floor based on the selected floor
         
          selection_object.alerts = []; // re initialize
          for (var i = 0; i < alerts_change.length; i++) {
              if (alerts_change[i].floor == selection_object.floor) {
                  selection_object.alerts.push(alerts_change[i]);
              }
          };

          browserHistory.push('/dashboard');

          return {
              ...state,
              selection: selection_object
          };
      case NAVIGATE_TO_ALERT:

          let n_floor_to_set =  action.payload.floornumber;
          let n_alerts_change = action.payload.alertsdata;
          let n_alertid =       action.payload.alertid;

          n_alerts_change.sort(function (alert1, alert2) {
              // Sort by count
              var dPriority = alert1.priority - alert2.priority;
              if (dPriority) return dPriority;

              // If there is a tie, sort by time
              var dTime = alert1.time - alert2.time;
              return dTime;
          });

          //Defining a temporary floor object for data manipulation
          let n_selection_object = JSON.parse(JSON.stringify(state.selection));
          n_selection_object.floor = n_floor_to_set; //assigning the selected floor to the temporary object from the payload of the action
          let n_floorsDatas = state.floors;


          //Loop for selecting the appropriate floormap with respect to the selected floor
          for (var i = 0; i < n_floorsDatas.length; i++) {
              if (n_floorsDatas[i].floor == n_selection_object.floor) {
                  n_selection_object.floormap = n_floorsDatas[i].floormap;
              }
          };

          //Loop for selecting the appropriate alerts with respect to the selected floor based on the selected floor
         
          n_selection_object.alerts = []; // re initialize
          for (var i = 0; i < n_alerts_change.length; i++) {
              if (n_alerts_change[i].floor == n_selection_object.floor) {
                  n_selection_object.alerts.push(n_alerts_change[i]);
              }
          };

          // Loop for selecting appropriate object to be selected based on AlertId
          for (var i = 0; i < n_selection_object.alerts.length; i++) {
              if ((n_selection_object.alerts[i].id) == n_alertid) {
                  n_selection_object.selectedalert = i;
              }
          };

          return {
              ...state,
              selection: n_selection_object
        };
      case REQUEST_FLOOR_DATA:

          return state;
      case SET_ALERT_EXPANSION:

          let sae_selection = JSON.parse(JSON.stringify(state.selection));
          sae_selection.selectedalert = action.payload;

          return {
              ...state,
              selection: sae_selection
          }
      case RESET_ALERT_EXPANSION:
      
         let rae_selection = JSON.parse(JSON.stringify(state.selection));
         rae_selection.selectedalert = -1;

         return {
             ...state,
             selection: rae_selection
         }
      // mock only
      case RECEIVE_ALERTS:
      
         let re_selection = JSON.parse(JSON.stringify(state.selection));
         re_selection.selectedalert   = -1;
         return {
             ...state,
             selection: re_selection
         }

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

      case UPDATE_ALERT_DATA:

        let updatedAlerts = [];
        
        let alertId       = action.payload.alertid;
        let updateObject  = action.payload.updateobject;

        var localAlertsCopy = state.alertsdata;
        var arrayLength = localAlertsCopy.length;
        var currentAlert = {};
        for (var i = 0; i < arrayLength; i++) {
          currentAlert = localAlertsCopy[i];

          if (currentAlert.id == alertId) {
              currentAlert.isnew = false;
            currentAlert.description = updateObject;
          }
          updatedAlerts.push(currentAlert);
        }
        
         //Defining a temporary floor object for data manipulation
        floor_obj = JSON.parse(JSON.stringify(state.selection));
        alertsdata = action.payload.alertsdata;

        //Loop for selecting the appropriate alerts with respect to the selected floor
        floor_obj.alerts = [];
        for (var i = 0; i < alertsdata.length; i++) {
            if (alertsdata[i].floor == floor_obj.floor) {
                floor_obj.alerts.push(alertsdata[i]);
            }
        };

        // alerts summary overlay is digested data
      // the intial values are 8 0s because we are assuming 8 levels of priority/type
      alertsSummary = [0, 0, 0, 0, 0];
      alertsHighlightsSummary = [0, 0, 0, 0, 0]
      alertsData = action.payload.alertsdata;

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
        alertsdata: updatedAlerts,
        selection: floor_obj,
        summary: alertsSummary,
        highlightsummary: alertsHighlightsSummary
      };   

    case RECEIVE_USER_DATA:

      let userDataFromServer = action.payload;
      userDataFromServer.defaultfloor = 1;

      return {
        ...state,
        userdata: userDataFromServer
      }

    case REQUEST_LOGIN:

      return {
        ...state,
        isLoggingIn: true
      };   
    case REQUEST_USER_DATA:

      return {
        ...state,
        isLoggingIn: false
      };
    case REQUEST_LOGIN_FAILED:

      return {
        ...state,
        isLoggingIn: false
      };

    case RECEIVE_ENTERPRISE_DATA:

      return {
        ...state,
        enterprisedata: action.payload
      };

    case RECEIVE_VENUE_DATA:

      return {
        ...state,
        venuedata: action.payload
      };

    case RECEIVE_BUILDING_DATA:

      return {
        ...state,
        buildingdata: action.payload
      };

    case RECEIVE_FLOOR_API_DATA:

      return {
        ...state,
        floorAPIdata: action.payload
      };

    case RECEIVE_SENSOR_ALERT_DATA:

      let sensoralertobject = action.payload;

      sensoralertobject.sort(function (alert1, alert2) {
        // Sort by count
        var dtype = alert1.alertType - alert2.alertType;
        if (dtype) return dtype;

        // If there is a tie, sort by time
        var dUTC = alert1.createUtc - alert2.createUtc;
        return dUTC;
      });

      alertsSummary = [0, 0, 0, 0, 0];
      alertsHighlightsSummary = [0, 0, 0, 0, 0];

      //Loop for counting the number of alerts for each type of alert
      for(var i = 0; i < sensoralertobject.length; i++) { 
        let priority = 1

        if (sensoralertobject[i].alertType === "SOS") {
            priority =  1    
        }

        else if (sensoralertobject[i].alertType === "HIGH_IMPACT") {
            priority =  2  
        }

        else if (sensoralertobject[i].alertType === "HIGH NOISE") {
            priority =  3  
        }

        else if (sensoralertobject[i].alertType === "MISSING") {
            priority =  4  
        }

        else if (sensoralertobject[i].alertType === "POWER_OFF") {
            priority =  5  
        }
          
          alertsSummary[priority-1]++;//incrementing the corresponding entry in the array for that alert
          if (sensoralertobject[i].isnew) {
            alertsHighlightsSummary[priority-1]++;
          }
      } 

      let returnAlerts = annotateWithSearchData(sensoralertobject);

      return {
        ...state,
        sensoralertdata: sensoralertobject,
        summary:          alertsSummary,
        highlightsummary: alertsHighlightsSummary,
        alertsdata: returnAlerts
      };  
      
    default:
      return state;
  }
};