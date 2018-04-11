import { REQUEST_LOGIN, REQUEST_ALERTS, REQUEST_ALERTS_MOCK } from '../constants'; 

export const createaction_doLogin = (userid, passcode) => {

  const return_object = {
    type: REQUEST_LOGIN,
    payload: {
      userid: userid,
      passcode: passcode
    }
  }
  return return_object;
}

export const createaction_requestAlerts = () => {

  const return_object = {
    type: REQUEST_ALERTS,
    payload: {

    }
    // no payload for requestAlerts, later authentication token may be added
  };
  return return_object;
}
