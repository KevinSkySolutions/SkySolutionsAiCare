import { REQUEST_FLOOR_DATA, RECEIVE_FLOOR_DATA, DIGEST_FLOOR_DATA, SELECT_FLOOR, SHOW_ALERT_DETAILS, SET_ALERT_EXPANSION, RESET_ALERT_EXPANSION } from '../constants';
import { browserHistory } from 'react-router';

// this is the floor data reducer, responds to all ACTIONS raised from the floor plan section part of
// every page. 

const defaultState = { 
    selection: {
        selectedalert: -1,   // this indicates which of the alerts is expanded currently
        floormap: {}, 
        floor: 1, 
        alerts: []
    }, 
    floors: [] 
};

export default function floordataReducer(state = defaultState , action) {

    switch (action.type) {
        case RECEIVE_FLOOR_DATA:

            console.log("RECEIVE_FLOOR_DATA type of action called.");

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

            console.log("DIGEST_FLOOR_DATA type of action called.");

            //Defining a temporary floor object for data manipulation
            let floor_obj = JSON.parse(JSON.stringify(state.selection));
            let alertsdata = action.payload;

            //Loop for selecting the appropriate alerts with respect to the selected floor
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

            console.log("SELECT_FLOOR type of action called.");

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
            let selection_object = { floor: 0, alerts: []};
            selection_object.floor = floor_to_set; //assigning the selected floor to the temporary object from the payload of the action
            let floorsDatas = state.floors;


            //Loop for selecting the appropriate floormap with respect to the selected floor
            for (var i = 0; i < floorsDatas.length; i++) {
                if (floorsDatas[i].floor == selection_object.floor) {
                    selection_object.floormap = floorsDatas[i].floormap;
                }
            };

            //Loop for selecting the appropriate alerts with respect to the selected floor based on the selected floor
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
        case REQUEST_FLOOR_DATA:

            console.log("REQUEST_FLOOR_DATA type of action called.");

            return state;
        case SHOW_ALERT_DETAILS:

            console.log("SHOW_ALERT_DETAILS type of action called.");
            console.log("payload is: ");
            console.log(action.payload);
            console.log(action.payload.floornumber);
            console.log(action.payload.key);

            // TODO, work on the toggle case, 

            return {
                ...state,
                selection: {
                    selectedalert: action.payload.floornumber   // this indicates which of the alerts is expanded currently
                }
            }
        case SET_ALERT_EXPANSION:

            console.log("SET_ALERT_EXPANSION type of action called.");

            return {
                ...state,
                selection: {
                    selectedalert: action.payload   // this indicates which of the alerts is expanded currently
                }
            }
        case RESET_ALERT_EXPANSION:

           console.log("RESET_ALERT_EXPANSION type of action called.");
            
            return {
                ...state,
                selection: {
                    selectedalert: -1   // this indicates which of the alerts is expanded currently
                }
            }
        default:
            return state;
    }
};