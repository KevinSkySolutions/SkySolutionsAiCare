import api from '../lib/api';

export const REQUEST_ALERTS = 'REQUEST_ALERTS';
export const RECEIVE_ALERTS = 'RECEIVE_ALERTS';
export const REQUEST_ALERT = 'REQUEST_ALERT';
export const RECEIVE_ALERT = 'RECEIVE_ALERT';

export const requestAlerts = () => ({
  type: REQUEST_ALERTS
});

export const requestAlert = () => ({
  type: REQUEST_ALERT
});

export const receiveAlert = json => ({
  type: RECEIVE_ALERT,
  alerts: json.data[0],
  receivedAt: Date.now()
});

export const fetchAlerts = () => (
  dispatch => api('https://apiendpoint.com/dataitem')
    .then(
      // TODO json => dispatch(receiveAlerts(json)),
    )
);

export const fetchAlertsIfNeeded = () => (
  (dispatch, getState) => {
    dispatch(fetchAlerts());
  }
);
