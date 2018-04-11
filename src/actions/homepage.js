import { REQUEST_LOGIN } from '../constants';

export const homepageActions = {
    login
};

/**
 * Action to be raised when user requests login
 * @param {string} username username of the user
 * @param {string} password password provided by the user
 */
function login(username, password) {
    return { type: REQUEST_LOGIN, payload: { username: username, password: password } };
}
