import 'rxjs'; // TODO remove this
import { combineEpics } from 'redux-observable';
import { REQUEST_ALERTS } from './constants';
import { alertsdataActions } from './actions';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';

export const requestAlerts = actions$ =>

    actions$
        .ofType(REQUEST_ALERTS)
        .mergeMap(action =>
            ajax
                .getJSON(`https://localhost:8000/alertsdata}`)
                .map(data => alertsdataActions.receiveAlertsData(data))
                .takeUntil(actions$.ofType(REQUEST_ALERTS))
                .retry(2)
                .catch(error => Observable.of(alertsdataActions.requestAlertsDataFailed()))
        );

export default combineEpics(
    requestAlerts
);
