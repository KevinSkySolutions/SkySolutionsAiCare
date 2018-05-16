import { REQUEST_ALERTS, RECEIVE_ALERTS, 
    RESET_ALERT_EXPANSION, SET_ALERT_EXPANSION, 
    REQUEST_SEARCH, UPDATE_ALERT_DATA,
    REQUEST_ALERTS_MOCK1, REQUEST_ALERTS_MOCK2, REQUEST_RESIDENTS_DATA, RECEIVE_RESIDENTS_DATA } from '../constants';

export const alertsdataActions = {
    requestAlertsData,
    receiveAlertsData,
    resetAlertExpansion,
    setAlertExpansion,
    requestSearch,
    updateAlertData,
    requestResidentsData,
    receiveResidentsData,
    /* ****** ALL MOCKS ****** */
    requestAlertsDataMock1,
    requestAlertsDataMock2
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

function updateAlertData(alertId, updateObject, alertsData) {
    return { type: UPDATE_ALERT_DATA, payload: { alertid: alertId, updateobject: updateObject, alertsdata: alertsData } }
}

/* ******************************* ALL MOCKS ***************************************** */
/**
 * Action to be raised for fetching mock data 1
 */
function requestAlertsDataMock1() {
    return { type: REQUEST_ALERTS_MOCK1, payload: {} };
}

/**
 * Action to be raised for fetching mock data 2
 */
function requestAlertsDataMock2() {
    return { type: REQUEST_ALERTS_MOCK2, payload: {} };
}

/**
 * Action to be raised when user requests a search item
 * @param keyword search string
 */
function requestSearch(keyword) {
    return { type: REQUEST_SEARCH, payload: keyword };
}

/**
 * Action to be raised immediately after login to fetch Residents data
 */
function requestResidentsData() {
    return { type: REQUEST_RESIDENTS_DATA, payload: {} };
}

/**
 * Raised as a response to valid data return from HTTP server
 * @param Residentsdata an array of Residents received
 */ 
function receiveResidentsData(residentsdata) {
    return { type: RECEIVE_RESIDENTS_DATA, payload: residentsdata };
}