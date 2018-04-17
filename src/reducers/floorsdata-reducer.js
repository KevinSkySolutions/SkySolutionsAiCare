import { REQUEST_FLOOR_DATA, RECEIVE_FLOOR_DATA } from '../constants';
import { alertsData } from './sampledata';

// this is the floor data reducer, responds to all ACTIONS raised from the floor plan section part of
// every page. 

export default function floordataReducer(state = { selection: {}, floors: [] }, action) {

    switch (action.type) {
        case RECEIVE_FLOOR_DATA:

            console.log("RECEIVE_FLOOR_DATA type of action called.");

            let floorsData = action.payload;

            console.log('FLOORDATA:');
            console.log(floorsData);

            //Defining a temporary floor object for data manipulation
            let floor_obj = { floormap: '', floor: 2, alerts: [] };

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
                floors: floorsData.details
            };
        case REQUEST_FLOOR_DATA:

            console.log("REQUEST_FLOOR_DATA type of action called.");

            return state;
        
        default:
            return state;
    }
};