import { REQUEST_LOGIN, REQUEST_USER_DATA, REQUST_LOGIN_FAILED, RECEIVE_USER_DATA } from '../constants';

export const homepageActions = {
    login,
    requestUserData,
    receiveUserData,
    loginFailed
};

/**
 * Action to be raised when user requests login
 * @param {string} username username of the user
 * @param {string} password password provided by the user
 */
function login(username, password) {
    // TODO, pass the username and password fields to the backend
    return { type: REQUEST_LOGIN, payload: { } };
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