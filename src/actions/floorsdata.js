import { REQUEST_FLOOR_DATA, RECEIVE_FLOOR_DATA } from '../constants';

export const floorsdataActions = {
    requestFloorsData,
    receiveFloorsData
};

/**
 * Action to populate the floors data
 */
function requestFloorsData() {
    return { type: REQUEST_FLOOR_DATA, payload: {} };
}

/**
 * Action to receive the floors data
 * @param {*} floorsdata data received as a response to requesting floors
 */
function receiveFloorsData(floorsdata) {
    return { type: RECEIVE_FLOOR_DATA, payload: floorsdata };
}