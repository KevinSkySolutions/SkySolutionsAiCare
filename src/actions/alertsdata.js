import { REQUEST_ALERTS, REQUEST_ALERTS_FAILED, RECEIVE_ALERTS, RESET_ALERT_EXPANSION, SET_ALERT_EXPANSION } from '../constants';

export const alertsdataActions = {
    requestAlertsData,
    receiveAlertsData,
    requestAlertsDataFailed,
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