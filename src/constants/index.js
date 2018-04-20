/**
 * This is the API end point to contact for data
 */
export const WEB_API_URL            = 'http://localhost:8080';

/**
 * All actions that can be raised when user is not logged in
 */
export const REQUEST_LOGIN          = 'A_REQUEST_LOGIN';
export const REQUEST_USER_DATA      = 'A_REQUEST_USER_DATA';
export const RECEIVE_USER_DATA      = 'A_RECEIVE_USER_DATA';
export const REQUEST_LOGIN_FAILED   = 'A_REQUEST_LOGIN_FAILED';
// this action below is for mocking the future data
export const REQUEST_ALERTS_MOCK    = "MA_REQUEST_ALERTS";

/**
 * All actions that cab ne raised for dashboard refresh
 */
export const REQUEST_ALERTS         = 'A_REQUEST_ALERTS';
export const RECEIVE_ALERTS         = 'A_RECEIVE_ALERTS';
export const REQUEST_ALERTS_FAILED  = 'A_REQUEST_ALERTS_FAILED'; 

/**
 * All actions that can be raised for the overlay
 */
export const REQUEST_ALERTS_SUMMARY = 'A_REQUEST_ALERTS_SUMMARY';
export const NAVIGATE_TO_ALERT      = 'A_NAVIGATE_TO_ALERT';

/**
 * All actions that can be raised for the map area
 */
export const REQUEST_FLOOR_DATA     = 'A_REQUEST_FLOOR_DATA';
export const RECEIVE_FLOOR_DATA     = 'A_RECEIVE_FLOOR_DATA';
export const DIGEST_FLOOR_DATA      = 'A_DIGEST_FLOOR_DATA';
export const SELECT_FLOOR           = 'A_SELECT_FLOOR';