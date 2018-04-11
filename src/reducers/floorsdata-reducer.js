import { REQUEST_FLOOR_DATA } from '../constants';
import { alertsData, floorsData } from './sampledata';

// this is the floor data reducer, responds to all ACTIONS raised from the floor plan section part of
// every page. 

export default function floordataReducer(state = { selection: {}, floors: [] }, action) {

    switch (action.type) {
        case REQUEST_FLOOR_DATA:

            console.log("REQUEST_FLOOR_DATA type of action called.");

            //Defining a temporary floor object for data manipulation
            let floor_obj = { floormap: '', floor: 1, alerts: [] };

            //Loop for selecting the appropriate floormap with respect to the selected floor
            for (var i = 0; i < floorsData.length; i++) {
                if (floorsData[i].floor == floor_obj.floor) {
                    floor_obj.floormap = floorsData[i].floormap;
                }
            };

            //Loop for selecting the appropriate alerts with respect to the selected floor
            for (var i = 0; i < alertsData.length; i++) {
                if (alertsData[i].floor == floor_obj.floor) {
                    floor_obj.alerts.push(alertsData[i]);
                }
            };

            return {
                ...state,
                selection: floor_obj,
                floors: floorsData
            };
        default:
            return state;
    }
};