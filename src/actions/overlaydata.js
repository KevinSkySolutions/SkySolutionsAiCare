import { REQUEST_ALERTS_SUMMARY, NAVIGATE_TO_ALERT } from '../constants';

export const overlaydataActions = {
    makeOverlaySummary
};

/**
 * Action to be raised after reciveing new alerts
 * @param alertsdata is the input data required to digest and make overlay summary
 */
function makeOverlaySummary(alertsdata) {
    return { type: REQUEST_ALERTS_SUMMARY, payload: alertsdata };
}

/**
 * Action to be raised when user chooses to navigate to an alert
 * @param {*} alertId is the ID of the alert to navigate to
 */
function navigateToAlertOnMap(alertId) {
    return { type: NAVIGATE_TO_ALERT, payload: inputPayload };
}
