import { REQUEST_ALERTS, REQUEST_ALERTS_FAILED, REQUEST_ALERTS_MOCK, RECEIVE_ALERTS, SHOW_ALERT_DETAILS, RESET_ALERT_EXPANSION, SET_ALERT_EXPANSION } from '../constants';

export const alertsdataActions = {
    requestAlertsData,
    receiveAlertsData,
    requestAlertsDataFailed,
    getAlertsDataMock,
    viewAlertDetails,
    resetAlertExpansion,
    setAlertExpansion
};

/**
 * Action to be raised immediately after login to fetch dashboard data
 */
function requestAlertsData() {
    return { type: REQUEST_ALERTS, payload: {} };
}

/**
 * Raised as a response to valid data return from HTTP server
 * @param alertsdata an array of alerts received
 */ 
function receiveAlertsData(alertsdata) {
    return { type: RECEIVE_ALERTS, payload: {alertsdata} };
}

/**
 * Raised as a response to invalid data return from HTTP server for receiving alerts
 */ 
function requestAlertsDataFailed(alertsdata) {
    return { type: RECEIVE_ALERTS, payload: {alertsdata} };
}

/**
 * Action to be raised to show a timetravel to future alerts for simulation
 */
function getAlertsDataMock() {
    return { type: REQUEST_ALERTS_MOCK, payload: {} };
}

/**
 * Action to navigate to a particular alert and seeing its details
 * @param {*} floorNumber   is the number of the floor to navigate to
 * @param {*} keyValue      is the keyValue of the alertItem to expand
 */
function viewAlertDetails(floorNumber, keyValue) {
    return { type: SHOW_ALERT_DETAILS, payload: {
        floornumber:    floorNumber,
        key:            keyValue
    }};
}

/**
 * Action to reset the current expansion of the alert item, auto triggered on select floor
 */
function resetAlertExpansion() {
    return { type: RESET_ALERT_EXPANSION, payload: {}}
}

/**
 * Action to set the current expansion of the alert item
 * @param keyValue is the key to be set as the expanded value
 */
function setAlertExpansion(keyValue) {
    return { type: SET_ALERT_EXPANSION, payload: keyValue }
}