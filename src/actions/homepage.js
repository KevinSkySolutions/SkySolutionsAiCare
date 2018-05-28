import { REQUEST_LOGIN, 
    REQUEST_USER_DATA, 
    REQUST_LOGIN_FAILED, 
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
RECEIVE_SENSOR_ALERT_DATA } from '../constants';

export const homepageActions = {
login,
requestUserData,
receiveUserData,
loginFailed,
requestEnterpriseData,
requestVenueData,
requestFloorAPIData,
requestBuildingData,
requestSensorAlertData,
receiveEnterpriseData,
receiveVenueData,
receiveFloorAPIData,
receiveBuildingData,
receiveSensorAlertData
};

/**
* Action to be raised when user requests login
* @param {string} username username of the user
* @param {string} password password provided by the user
*/
function login(username, password) {
// TODO, pass the username and password fields to the backend
return { type: REQUEST_LOGIN, payload: { } };1
}

/**
* Action to be raised when login request successful to fetch user specific data and defaults
*/
function requestUserData() {
return { type: REQUEST_USER_DATA, payload: {} };
}

/**
* Action to be raised when login request successful to fetch user specific data and defaults
*/
function receiveUserData(userdata) {
return { type: RECEIVE_USER_DATA, payload: userdata };
}

/**
* Action to be raised when login request unsuccessful
*/
function loginFailed() {
return { type: REQUST_LOGIN_FAILED, payload: {} };
}

/**
* Action to be raised when login request successful to fetch enterprise specific data and defaults
*/
function requestEnterpriseData() {
return { type: REQUEST_ENTERPRISE_DATA, payload: {} };
}

/**
* Action to be raised when login request successful to fetch enterprise specific data and defaults
*/
function requestVenueData() {
return { type: REQUEST_VENUE_DATA, payload: {} };
}

/**
* Action to be raised when login request successful to fetch enterprise specific data and defaults
*/
function requestFloorAPIData() {
return { type: REQUEST_FLOOR_API_DATA, payload: {} };
}

/**
* Action to be raised when login request successful to fetch enterprise specific data and defaults
*/
function requestBuildingData() {
return { type: REQUEST_BUILDING_DATA, payload: {} };
}

/**
* Action to be raised when login request successful to fetch enterprise specific data and defaults
*/
function requestSensorAlertData() {
return { type: REQUEST_SENSOR_ALERT_DATA, payload: {} };
}

/**
* Action to be raised when login request successful to fetch enterprise specific data and defaults
*/
function receiveEnterpriseData(enterprisedata) {
return { type: RECEIVE_ENTERPRISE_DATA, payload: enterprisedata };
}

/**
* Action to be raised when login receive successful to fetch enterprise specific data and defaults
*/
function receiveVenueData(venuedata) {
return { type: RECEIVE_VENUE_DATA, payload: venuedata };
}

/**
* Action to be raised when login receive successful to fetch enterprise specific data and defaults
*/
function receiveFloorAPIData(floorAPIdata) {
return { type: RECEIVE_FLOOR_API_DATA, payload: floorAPIdata };
}

/**
* Action to be raised when login receive successful to fetch enterprise specific data and defaults
*/
function receiveBuildingData(buildingdata) {
return { type: RECEIVE_BUILDING_DATA, payload: buildingdata };
}

/**
* Action to be raised when login receive successful to fetch enterprise specific data and defaults
*/
function receiveSensorAlertData(sensoralertdata) {
return { type: RECEIVE_SENSOR_ALERT_DATA, payload: sensoralertdata };
}