import { REQUEST_ALERTS, REQUEST_ALERTS_FAILED, REQUEST_ALERTS_MOCK, RECEIVE_ALERTS } from '../constants';

export const alertsdataActions = {
    requestAlertsData,
    receiveAlertsData,
    requestAlertsDataFailed,
    getAlertsDataMock
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