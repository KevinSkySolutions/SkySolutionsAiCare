export const REQUEST_LOGIN   = 'A_REQUEST_LOGIN'
export const REQUEST_ALERTS  = 'A_REQUEST_ALERTS';

export const createaction_doLogin = (userid, passcode) => {

  const return_object = {
    type: REQUEST_LOGIN,
    payload: {
      userid: userid,
      passcode: passcode
    }
  }
  console.log("createaction_doLogin");
  console.log(return_object);
  return return_object;
}

export const createaction_requestAlerts = () => {

  const return_object = {
    type: REQUEST_ALERTS,
    payload: {

    }
    // no payload for requestAlerts, later authentication token may be added
  };
  console.log("createaction_requestAlerts");
  console.log(return_object);
  return return_object;
}
