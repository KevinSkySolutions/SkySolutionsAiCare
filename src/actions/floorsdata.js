import { REQUEST_FLOOR_DATA } from '../constants';

export const floorsdataActions = {
    getFloorsData
};

/**
 * Action to populate the floors data
 * @param {number} defaultFloor 
 */
function getFloorsData(defaultFloor) {
    return { type: REQUEST_FLOOR_DATA, payload: { floor: defaultFloor } };
}