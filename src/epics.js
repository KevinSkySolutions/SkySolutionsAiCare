import { browserHistory } from 'react-router';
import { combineEpics } from 'redux-observable';
import 'rxjs'; // TODO remove this
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { alertsdataActions, floorsdataActions, homepageActions, overlaydataActions } from './actions';
import { DIGEST_FLOOR_DATA, NAVIGATE_TO_ALERT, RECEIVE_ALERTS, REQUEST_ALERTS, REQUEST_ALERTS_MOCK1, REQUEST_ALERTS_MOCK2, REQUEST_BUILDING_DATA, REQUEST_ENTERPRISE_DATA, REQUEST_FLOOR_API_DATA, REQUEST_FLOOR_DATA, REQUEST_LOGIN, REQUEST_SENSOR_ALERT_DATA, REQUEST_USER_DATA, REQUEST_VENUE_DATA, WEB_API_URL, UPDATE_ALERT_DATA, REQUEST_LOGOUT } from './constants';




// import { withCookies, Cookies } from 'react-cookie';

export const requestLogout = actions$ => actions$
        .ofType(REQUEST_LOGOUT)
        .map(() => {
            ajax({
                url: '/api/logout',
                method: 'GET',
                headers: { 'Content-Type': 'application/json'},
                crossDomain: true,
                withCredentials: true
            }).subscribe(data =>  {
                console.log('logout successfull: ', data);
                browserHistory.push('/');
            }, error => {
                browserHistory.push('/');    
            });
            return { type: "NO_CLASH_TYPE" };
        });

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
            ajax({
              url: WEB_API_URL + 'careGiver/login/',
              method: 'POST',
              body: {userName: action.payload.username, password: action.payload.password},
              headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
              crossDomain: true,
              withCredentials: true
            }).map((res) => {
                    if (res.response.enabled === true) {
                       ajax({
                           url: '/api/savelogin',
                           method: 'POST',
                           body: res.response,
                           headers: { 'Content-Type': 'application/json'},
                           crossDomain: true,
                           withCredentials: true
                       }).subscribe(data =>  {
                           console.log('Session saved: ', data);
                       });
                       return( homepageActions.requestUserData(),
                               homepageActions.requestEnterpriseData(res.response))
                    }
                })
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
                .getJSON("/userdata")
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

/**********************************************API LOGIC *******************************************************/

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
            ajax({
                url: WEB_API_URL + 'enterprise/findById/',
                method: 'POST',
                body: { id: action.payload.enterpriseId },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                crossDomain: true,
                withCredentials: true
              }).mergeMap((data) => Observable.of(
                    homepageActions.receiveEnterpriseData(data.response),
                    homepageActions.requestVenueData(data.response.id)
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
            ajax({
                url: WEB_API_URL + 'venue/find/',
                method: 'POST',
                body: {enterpriseId: action.payload},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                crossDomain: true,
                withCredentials: true
              }).mergeMap((data) => Observable.of(
                    homepageActions.receiveVenueData(data.response[0]),
                    homepageActions.requestBuildingData(data.response[0].id)
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
            ajax({
                    url: WEB_API_URL + 'building/find/',
                    method: 'POST',
                    body: {venueId: action.payload},
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    crossDomain: true,
                    withCredentials: true
                  })
                .mergeMap((data) => Observable.of(
                    homepageActions.receiveBuildingData(data.response[0]),
                    homepageActions.requestFloorAPIData(data.response[0].id)
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
            ajax({
                url: WEB_API_URL + 'floor/find/',
                method: 'POST',
                body: {buildingId: action.payload},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                crossDomain: true,
                withCredentials: true
              }).mergeMap((data) => Observable.of(
                    homepageActions.receiveFloorAPIData(data.response),
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
            ajax({
                url: WEB_API_URL + 'sensorAlert/find/',
                method: 'POST',
                body: {maxResults: 50 },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                crossDomain: true,
                withCredentials: true
              }).mergeMap((data) => Observable.of(
                    homepageActions.receiveSensorAlertData(data.response)
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
export const updateAlertData = actions$ =>

    actions$
        .ofType(UPDATE_ALERT_DATA)
        .mergeMap(action =>
            ajax({
                url: WEB_API_URL + 'sensorAlert/triggerEvent/',
                method: 'POST',
                body: {id: action.payload.alertid, alertEvent: action.payload.updateobject, description: action.payload.description},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                crossDomain: true,
                withCredentials: true
              }).mergeMap((data) => Observable.of(
                    homepageActions.requestEnterpriseData(action.payload.enterpriseId)
                ))
            // TODO, retry and fail gracefully 
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );
        

/* ************************************************************************************* */

export default combineEpics(
    requestLogout,
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
    //below are API epics
    requestEnterpriseData,
    requestVenueData,
    requestBuildingData,
    requestFloorAPIData,
    requestSensorAlertData
);
