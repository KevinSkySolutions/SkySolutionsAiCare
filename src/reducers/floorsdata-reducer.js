import { REQUEST_FLOOR_DATA, RECEIVE_FLOOR_DATA, DIGEST_FLOOR_DATA } from '../constants';

// this is the floor data reducer, responds to all ACTIONS raised from the floor plan section part of
// every page. 

const defaultState = { 
    selection: {
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
            let alertsData = action.payload;

            //Loop for selecting the appropriate alerts with respect to the selected floor
            for (var i = 0; i < alertsData.length; i++) {
                if (alertsData[i].floor == floor_obj.floor) {
                    floor_obj.alerts.push(alertsData[i]);
                }
            };

            return {
                ...state,
                selection: floor_obj
            };
        
        case REQUEST_FLOOR_DATA:

            console.log("REQUEST_FLOOR_DATA type of action called.");

            return state;
        
        default:
            return state;
    }
};