import 'rxjs'; // TODO remove this
import { combineEpics } from                        'redux-observable';

import { REQUEST_ALERTS_MOCK1, 
         REQUEST_ALERTS_MOCK2,
         REQUEST_ALERTS, 
         REQUEST_USER_DATA, 
         REQUEST_LOGIN, 
         REQUEST_FLOOR_DATA, 
         DIGEST_FLOOR_DATA, 
         NAVIGATE_TO_ALERT, 
         RECEIVE_ALERTS,
         REQUEST_FLOOR_API_DATA,
         REQUEST_ENTERPRISE_DATA,
         REQUEST_VENUE_DATA,
         REQUEST_BUILDING_DATA,
         REQUEST_SENSOR_ALERT_DATA,
         WEB_API_URL } from     './constants';

import { alertsdataActions, 
         homepageActions, 
         floorsdataActions, 
         overlaydataActions } from    './actions';

import { ajax } from                                'rxjs/observable/dom/ajax';
import { Observable } from                          'rxjs';
import { browserHistory } from                      'react-router';

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
                .post(WEB_API_URL + 'careGiver/login/', {userName: action.payload.username, password: action.payload.password}, { 'Content-Type': 'application/x-www-form-urlencoded' })
                .map((res) => {
                    // console.log(res.response.enabled)
                    if (res.response.enabled === true) {
                       return (homepageActions.requestUserData())
                    }
                    
                })
            // TODO, retry and fail gracefully 
            // .catch(error => Observable.of(homepageActions.loginFailed()))
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
                .getJSON("/userdata")
                .mergeMap((data) => Observable.of(
                    homepageActions.receiveUserData(data),
                    floorsdataActions.requestFloorsData(),
                    homepageActions.requestEnterpriseData()
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
                .getJSON("/floorsdata")
                .mergeMap((data) => Observable.of(
                    floorsdataActions.receiveFloorsData(data),
                    alertsdataActions.requestAlertsData()
                ))
            // TODO, retry and fail gracefully 
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestAlerts" invoked reactively upon success of fetching floors data
 * once alerts data is available, its saved and also populated in the overlay
 * @param {*} actions$ default parameter for each such epic
 */
export const requestAlerts = actions$ =>

    actions$
        .ofType(REQUEST_ALERTS)
        .mergeMap(action =>
            ajax
                .getJSON("/alertsdata")
                .mergeMap(data => Observable.of(
                    alertsdataActions.receiveAlertsData(data),
                    overlaydataActions.makeOverlaySummary(data),
                    floorsdataActions.digestFloorsData(data)
                ))
                //.catch(error => Observable.of(alertsdataActions.requestAlertsDataFailed()))
                .catch(error => Observable.of(alertsdataActions.receiveAlertsData(data)))
        );

/**
 * "requestResidents" invoked reactively upon success of fetching floors data
 * once alerts data is available, its saved and also populated in the overlay
 * @param {*} actions$ default parameter for each such epic
 */
export const requestResidents = actions$ =>

    actions$
        .ofType(RECEIVE_ALERTS)
        .mergeMap(action =>
            ajax
                .getJSON("/patientsdata")
                .mergeMap(data => Observable.of(
                    alertsdataActions.receiveResidentsData(data)
                ))
                //.catch(error => Observable.of(alertsdataActions.requestAlertsDataFailed()))
                .catch(error => Observable.of(alertsdataActions.receiveResidentsData(data)))
        );



/**
 * "navigateToAlert" invoked reactively upon user action
 * overlay closes as a side affect
 * @param {*} actions$ default parameter for each such epic
 */
export const navigateToAlert = actions$ =>
    actions$
        .ofType(NAVIGATE_TO_ALERT)
        .mergeMap(() => Observable.of(
            overlaydataActions.resetOverlayExpansion()
        ));

/**
 * "redirectToDashboard" invoked reactively upon digesting the floors data
 * @param {*} actions$ default parameter for each such epic
 */
export const redirectToDashboard = actions$ =>

    actions$
        .ofType(DIGEST_FLOOR_DATA)
        .map(() => {
            browserHistory.push('/dashboard');
            return { type: "NO_CLASH_TYPE" };
        });

/* ************************************************************************************* */
/**
 * "requestAlertsMock1" 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestAlertsMock1 = actions$ =>

    actions$
        .ofType(REQUEST_ALERTS_MOCK1)
        .mergeMap(action =>
            ajax
                .getJSON("/futureAlertsData")
                .mergeMap(data => Observable.of(
                    alertsdataActions.receiveAlertsData(data),
                    overlaydataActions.makeOverlaySummary(data),
                    floorsdataActions.digestFloorsData(data)
                ))
                //.catch(error => Observable.of(alertsdataActions.requestAlertsDataFailed()))
                .catch(error => Observable.of(alertsdataActions.receiveAlertsData(data)))
        );
/**
 * "requestAlertsMock2" 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestAlertsMock2 = actions$ =>

    actions$
        .ofType(REQUEST_ALERTS_MOCK2)
        .mergeMap(action =>
            ajax
                .getJSON("/futureAlertsData2")
                .mergeMap(data => Observable.of(
                    alertsdataActions.receiveAlertsData(data),
                    overlaydataActions.makeOverlaySummary(data),
                    floorsdataActions.digestFloorsData(data)
                ))
                //.catch(error => Observable.of(alertsdataActions.requestAlertsDataFailed()))
                .catch(error => Observable.of(alertsdataActions.receiveAlertsData(data)))
        );

/**
 * "requestEnterpriseData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive Enterprise data and populate the state
 * 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestEnterpriseData = actions$ =>

    actions$
        .ofType(REQUEST_ENTERPRISE_DATA)
        .mergeMap(action =>
            ajax
                .getJSON("/enterpriseData")
                .mergeMap((data) => Observable.of(
                    homepageActions.receiveEnterpriseData(data),
                    homepageActions.requestVenueData()
                ))
            // TODO, retry and fail gracefully 
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestVenueData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive Venue data and populate the state
 * 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestVenueData = actions$ =>

    actions$
        .ofType(REQUEST_VENUE_DATA)
        .mergeMap(action =>
            ajax
                .getJSON("/venueData")
                .mergeMap((data) => Observable.of(
                    homepageActions.receiveVenueData(data),
                    homepageActions.requestBuildingData()
                ))
            // TODO, retry and fail gracefully 
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestBuildingData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive Building data and populate the state
 * 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestBuildingData = actions$ =>

    actions$
        .ofType(REQUEST_BUILDING_DATA)
        .mergeMap(action =>
            ajax
                .getJSON("/buildingData")
                .mergeMap((data) => Observable.of(
                    homepageActions.receiveBuildingData(data),
                    homepageActions.requestFloorAPIData()
                ))
            // TODO, retry and fail gracefully 
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestFloorAPIData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive FloorAPI data and populate the state
 * 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestFloorAPIData = actions$ =>

    actions$
        .ofType(REQUEST_FLOOR_API_DATA)
        .mergeMap(action =>
            ajax
                .getJSON("/floorAPIData")
                .mergeMap((data) => Observable.of(
                    homepageActions.receiveFloorAPIData(data),
                    homepageActions.requestSensorAlertData()
                ))
            // TODO, retry and fail gracefully 
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestSensorAlertData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive SensorAlert data and populate the state
 * 
 * @param {*} actions$ default parameter for each such epic
 */
export const requestSensorAlertData = actions$ =>

    actions$
        .ofType(REQUEST_SENSOR_ALERT_DATA)
        .mergeMap(action =>
            ajax
                .getJSON("/sensorAlertData")
                .mergeMap((data) => Observable.of(
                    homepageActions.receiveSensorAlertData(data)
                ))
            // TODO, retry and fail gracefully 
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );


/* ************************************************************************************* */

export default combineEpics(
    requestLogin,
    requestUserData,
    requestFloorsData,
    requestAlerts,
    redirectToDashboard,
    navigateToAlert,
    // below are for mock only
    requestAlertsMock1,
    requestAlertsMock2,
    requestResidents,
    requestEnterpriseData,
    requestVenueData,
    requestBuildingData,
    requestFloorAPIData,
    requestSensorAlertData
);
