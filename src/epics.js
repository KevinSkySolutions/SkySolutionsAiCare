import 'rxjs'; // TODO remove this
import { combineEpics } from 'redux-observable';
import { WEB_API_URL } from './constants';
import { REQUEST_ALERTS, REQUEST_USER_DATA, REQUEST_LOGIN, REQUEST_FLOOR_DATA } from './constants';
import { alertsdataActions, homepageActions, floorsdataActions, overlaydataActions } from './actions';
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
                .mergeMap((data) => Observable.of(
                    homepageActions.receiveUserData(data),
                    floorsdataActions.requestFloorsData()
                ))
                // TODO, retry and fail gracefully 
                // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestFloorsData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive floor data and populate the state
 * 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestFloorsData = actions$ =>

    actions$
        .ofType(REQUEST_FLOOR_DATA)
        .mergeMap(action =>
            ajax
                .getJSON(`${WEB_API_URL}/floorsdata`)
                .mergeMap((data) => Observable.of(
                    floorsdataActions.receiveFloorsData(data),
                    alertsdataActions.requestAlertsData(),
                    overlaydataActions.makeOverlaySummary() 
                ))
                // TODO, retry and fail gracefully 
                // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestAlerts" invoked reactively upon success of fetching floors data
 * @param {*} actions$ default parameter for each such epic
 */
export const requestAlerts = actions$ =>

    actions$
        .ofType(REQUEST_ALERTS)
        .mergeMap(action =>
            ajax
                .getJSON(`${WEB_API_URL}/alertsdata`)
                .map(data => { 
                    console.log("alerts success"); 
                    console.log(data);
                    return alertsdataActions.receiveAlertsData(data) 
                })
                //.catch(error => Observable.of(alertsdataActions.requestAlertsDataFailed()))
                .catch(error => Observable.of(alertsdataActions.receiveAlertsData(data)))
        );

export default combineEpics(
    requestLogin,
    requestUserData,
    requestFloorsData,
    requestAlerts
);
