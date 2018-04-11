import { REQUEST_ALERTS, REQUEST_ALERTS_MOCK } from '../constants';

export const alertsdataActions = {
    getAlertsData,
    getAlertsDataMock
};

/**
 * Action to be raised immediately after login to fetch dashboard data to 
 * populate latest alerts for the first time
 */
function getAlertsData() {
    return { type: REQUEST_ALERTS, payload: {} };
}

/**
 * Action to be raised to show a timetravel to future alerts for simulation
 */
function getAlertsDataMock() {
    return { type: REQUEST_ALERTS_MOCK, payload: {} };
}