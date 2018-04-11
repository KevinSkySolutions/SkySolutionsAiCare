import { REQUEST_ALERTS_SUMMARY } from '../constants';

export const overlaydataActions = {
    makeOverlaySummary
};

/**
 * Action to be raised after reciveing new alerts
 */
function makeOverlaySummary() {
    return { type: REQUEST_ALERTS_SUMMARY, payload: {} };
}
