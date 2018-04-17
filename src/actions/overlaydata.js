import { REQUEST_ALERTS_SUMMARY } from '../constants';

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
