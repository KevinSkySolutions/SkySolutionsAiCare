import 'rxjs'; // TODO remove this
import { combineEpics } from 'redux-observable';
import { WEB_API_URL } from './constants';
import { REQUEST_ALERTS, REQUEST_USER_DATA, REQUEST_LOGIN } from './constants';
import { alertsdataActions, homepageActions } from './actions';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';

/**
 * "requestLogin" invoked automatically when user presses login button
 * success would result in raising an action to fetch user data
 * 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestLogin = actions$ =>

    actions$
        .ofType(REQUEST_LOGIN)
        .mergeMap(action =>
            ajax
                .getJSON(`${WEB_API_URL}/login`)
                .map((data) => {
                    return homepageActions.requestUserData()
                 } )
                .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestUserData" invoked reactively to fetch the user data
 * success would result in raising an action to receive the user data
 * 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestUserData = actions$ =>

    actions$
        .ofType(REQUEST_USER_DATA)
        .mergeMap(action =>
            ajax
                .getJSON(`${WEB_API_URL}/userdata`)
                .map((data) => { 
                    return homepageActions.receiveUserData(data);
                 } )
                // TODO, retry and fail gracefully 
                // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

export const requestAlerts = actions$ =>

    actions$
        .ofType(REQUEST_ALERTS)
        .mergeMap(action =>
            ajax
                .getJSON(`${WEB_API_URL}/alertsdata`)
                .map(data => { 
                    console.log("alerts success"); 
                    console.log(data);
                    alertsdataActions.receiveAlertsData(data) 
                })
                //.catch(error => Observable.of(alertsdataActions.requestAlertsDataFailed()))
                .catch(error => Observable.of(alertsdataActions.receiveAlertsData(data)))
        );

export default combineEpics(
    requestLogin,
    requestUserData,
    requestAlerts
);
