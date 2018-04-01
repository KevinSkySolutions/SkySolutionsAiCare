import api from '../lib/api';

export const A_REQUEST_ALERTS = 'login:requestalerts';
export const A_RECEIVE_ALERTS = 'login:receivealerts';

export const requestAlerts = () => ({
  type: A_REQUEST_ALERTS
});

export const getAlerts = () => (
  dispatch => api('https://apiendpoint.com/dataitem')
    .then(
      json => dispatch(receiveAlerts(json)),
    )
    .catch((error) => {
      console.log("Error in getAlerts api call");
  })
);

export const actionGetAlerts = () => (
  (dispatch, getState) => {
    dispatch(getAlerts());
  }
);
