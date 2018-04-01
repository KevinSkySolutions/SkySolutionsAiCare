const REQUEST_LOGIN   = 'A_REQUEST_LOGIN'
const REQUEST_ALERTS  = 'A_REQUEST_ALERTS';

export const createaction_doLogin = (userid, passcode) => {
  return {
    type: REQUEST_LOGIN,
    userid: userid,
    passcode: passcode
  };
}

export const createaction_requestAlerts = () => {
  return {
    type: REQUEST_ALERTS
    // no payload for requestAlerts, later authentication token may be added
  };
}
